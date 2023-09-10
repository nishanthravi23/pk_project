import { Request, Response } from "express";
import { QuotationService } from "../services"; // Assuming you have a QuotationService
import { Quotation } from "../models"; // Assuming you have a Quotation model
import { getPagingData } from "../helpers";
import { QuotationItem } from "../models/quotation-item"; // Assuming you have a QuotationItem model
import { sequelize } from "../db";
import { Op } from "sequelize";

export class QuotationController {
    private quotationService: QuotationService;

    constructor() {
        this.quotationService = new QuotationService(Quotation);
    }

    options = {
        include: [
            {
                model: QuotationItem,
                as: "goods",
            },
        ],
    };

    getPaged(req: Request, res: Response) {
        const { page, size } = req.query;
        this.quotationService
            .getPaged(page, size, this.options)
            .then((quotation) =>
                res.status(200).json(getPagingData(quotation))
            );
    }

    getAll(req: Request, res: Response) {
        this.quotationService
            .getAll()
            .then((quotation) => res.status(200).json(quotation));
    }

    getById(req: Request, res: Response) {
        this.quotationService
            .get(req.params.id, this.options)
            .then((quotation) => {
                if (quotation) res.status(200).json(quotation);
                else
                    res.status(404).json({
                        message: `Quotation id:${req.params.id} does not exist`,
                    });
            });
    }

    async upsert(req: Request, res: Response) {
        let { id, quoteNo, date, companyName, address, gstin, hsnCode, goods } =
            req.body;

        let quotation: any = {
            quoteNo,
            date,
            companyName,
            address,
            gstin,
            hsnCode,
        };
        if (id) quotation = { ...quotation, id };

        const t = await sequelize.transaction();

        try {
            //! Creating or Updating quotation
            const [createdQuotation, isExist] = await Quotation.upsert(
                quotation,
                {
                    transaction: t,
                    returning: true,
                }
            );

            //! Updating goods
            let updatedGoods = goods.map((item: any) => ({
                ...item,
                quotationId: createdQuotation.dataValues.id,
            }));
            const createdQuotationItems = await QuotationItem.bulkCreate(
                updatedGoods,
                {
                    transaction: t,
                    updateOnDuplicate: [
                        "model",
                        "serialNo",
                        "spare",
                        "delivery",
                        "quantity",
                        "unitPrice",
                        "tonnage",
                    ],
                    returning: true,
                }
            );

            //! Deleting goods
            const goodsIds: number[] = [];
            updatedGoods.forEach((g: any) => {
                if (g.id) goodsIds.push(g.id);
            });
            createdQuotationItems.map((g: any) => {
                if (g.dataValues.id) goodsIds.push(g.dataValues.id);
            });
            await QuotationItem.destroy({
                where: {
                    id: { [Op.notIn]: goodsIds },
                    quotationId: createdQuotation.dataValues.id,
                },
                transaction: t,
            });

            t.commit();
            res.status(201).json(createdQuotation);
        } catch (err) {
            t.rollback();
            res.status(400).json(err);
            console.log(err);
        }
    }

    delete(req: Request, res: Response) {
        this.quotationService.get(req.params.id).then((quotation) => {
            if (quotation) {
                this.quotationService
                    .delete(req.params.id)
                    .then(() => res.status(200).json())
                    .catch((err) => res.status(400).json(err));
            } else
                res.status(404).json({
                    message: `Quotation id:${req.params.id} does not exist`,
                });
        });
    }
}
