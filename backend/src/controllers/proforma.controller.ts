import { Request, Response } from "express";
import { ProformaService } from "../services";
import { Proforma } from "../models";
import { getPagingData } from "../helpers";
import { ProformaItem } from "../models/proforma-item";
import { sequelize } from "../db";
import { Op } from "sequelize";

export class ProformaController {
    private proformaService: ProformaService;

    constructor() {
        this.proformaService = new ProformaService(Proforma);
    }

    options = {
        include: [
            {
                model: ProformaItem,
                as: "goods",
            },
        ],
    };

    getPaged(req: Request, res: Response) {
        const { page, size } = req.query;
        this.proformaService
            .getPaged(page, size, this.options)
            .then((proforma) => res.status(200).json(getPagingData(proforma)));
    }

    getAll(req: Request, res: Response) {
        this.proformaService
            .getAll()
            .then((proforma) => res.status(200).json(proforma));
    }

    getById(req: Request, res: Response) {
        this.proformaService
            .get(req.params.id, this.options)
            .then((proforma) => {
                if (proforma) res.status(200).json(proforma);
                else
                    res.status(404).json({
                        message: `Proforma id:${req.params.id} does not exist`,
                    });
            });
    }

    async upsert(req: Request, res: Response) {
        let { id, gstin, date, poNo, piNo, customerName, hsnCode, products } =
            req.body;

        let proforma: any = {
            gstin,
            date,
            piNo,
            customerName,
            poNo,
            hsnCode,
        };
        if (id) proforma = { ...proforma, id };

        const t = await sequelize.transaction();

        try {
            //! Creating or Updating proforma
            const [createdProforma, isExist] = await Proforma.upsert(proforma, {
                transaction: t,
                returning: true,
            });

            //! Updating goods
            let updatedGoods = products.map((item: any) => ({
                ...item,
                proformaId: createdProforma.dataValues.id,
            }));
            const createdProformaItems = await ProformaItem.bulkCreate(
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
                    ],
                    returning: true,
                }
            );

            //! Deleting goods
            const goodsIds: number[] = [];
            updatedGoods.forEach((g: any) => {
                if (g.id) goodsIds.push(g.id);
            });
            createdProformaItems.map((g: any) => {
                if (g.dataValues.id) goodsIds.push(g.dataValues.id);
            });
            await ProformaItem.destroy({
                where: {
                    id: { [Op.notIn]: goodsIds },
                    proformaId: createdProforma.dataValues.id,
                },
                transaction: t,
            });

            t.commit();
            res.status(201).json(createdProforma);
        } catch (err) {
            t.rollback();
            res.status(400).json(err);
            console.log(err);
        }
    }

    delete(req: Request, res: Response) {
        this.proformaService.get(req.params.id).then((proforma) => {
            if (proforma) {
                this.proformaService
                    .delete(req.params.id)
                    .then(() => res.status(200).json())
                    .catch((err) => res.status(400).json(err));
            } else
                res.status(404).json({
                    message: `Proforma id:${req.params.id} does not exist`,
                });
        });
    }
}
