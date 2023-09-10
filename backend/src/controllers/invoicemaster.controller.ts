import { Request, Response } from "express";
import { InvoiceMasterService } from "../services"; // Assuming you have an InvoiceMasterService
import { InvoiceMaster } from "../models"; // Assuming you have an InvoiceMaster model
import { getPagingData } from "../helpers";
import { InvoiceMasterItem } from "../models/invoice-master-item"; // Assuming you have an InvoiceMasterItem model
import { sequelize } from "../db";
import { Op } from "sequelize";

export class InvoiceMasterController {
    private invoiceMasterService: InvoiceMasterService;

    constructor() {
        this.invoiceMasterService = new InvoiceMasterService(InvoiceMaster);
    }

    options = {
        include: [
            {
                model: InvoiceMasterItem,
                as: "items",
            },
        ],
    };

    getPaged(req: Request, res: Response) {
        const { page, size } = req.query;
        this.invoiceMasterService
            .getPaged(page, size, this.options)
            .then((invoiceMaster) =>
                res.status(200).json(getPagingData(invoiceMaster))
            );
    }

    getAll(req: Request, res: Response) {
        this.invoiceMasterService
            .getAll()
            .then((invoiceMaster) => res.status(200).json(invoiceMaster));
    }

    getById(req: Request, res: Response) {
        this.invoiceMasterService
            .get(req.params.id, this.options)
            .then((invoiceMaster) => {
                if (invoiceMaster) res.status(200).json(invoiceMaster);
                else
                    res.status(404).json({
                        message: `InvoiceMaster id:${req.params.id} does not exist`,
                    });
            });
    }

    async upsert(req: Request, res: Response) {
        let {
            id,
            Email,
            Date,
            CIN,
            PAN,
            GSTIN,
            "Invoice Ref": InvoiceRef,
            "Address Line 1": AddressLine1,
            "Address Line 2": AddressLine2,
            "Address Line 3": AddressLine3,
            "Customer Code": CustomerCode,
            State,
            "Customer GSTIN": CustomerGSTIN,
            Address,
            items,
        } = req.body;

        let invoiceMaster: any = {
            Email,
            Date,
            CIN,
            PAN,
            GSTIN,
            "Invoice Ref": InvoiceRef,
            "Address Line 1": AddressLine1,
            "Address Line 2": AddressLine2,
            "Address Line 3": AddressLine3,
            "Customer Code": CustomerCode,
            State,
            "Customer GSTIN": CustomerGSTIN,
            Address,
        };
        if (id) invoiceMaster = { ...invoiceMaster, id };

        const t = await sequelize.transaction();

        try {
            //! Creating or Updating invoiceMaster
            const [createdInvoiceMaster, isExist] = await InvoiceMaster.upsert(
                invoiceMaster,
                {
                    transaction: t,
                    returning: true,
                }
            );

            //! Updating items
            let updatedItems = items.map((item: any) => ({
                ...item,
                invoiceMasterId: createdInvoiceMaster.dataValues.id,
            }));
            const createdInvoiceMasterItems = await InvoiceMasterItem.bulkCreate(
                updatedItems,
                {
                    transaction: t,
                    updateOnDuplicate: [
                        "HTA",
                        "Product Description",
                        "HSN/SAC",
                        "QTY",
                        "UOM",
                        "RATE",
                        "Value",
                    ],
                    returning: true,
                }
            );

            //! Deleting items
            const itemIds: number[] = [];
            updatedItems.forEach((item: any) => {
                if (item.id) itemIds.push(item.id);
            });
            createdInvoiceMasterItems.map((item: any) => {
                if (item.dataValues.id) itemIds.push(item.dataValues.id);
            });
            await InvoiceMasterItem.destroy({
                where: {
                    id: { [Op.notIn]: itemIds },
                    invoiceMasterId: createdInvoiceMaster.dataValues.id,
                },
                transaction: t,
            });

            t.commit();
            res.status(201).json(createdInvoiceMaster);
        } catch (err) {
            t.rollback();
            res.status(400).json(err);
            console.log(err);
        }
    }

    delete(req: Request, res: Response) {
        this.invoiceMasterService.get(req.params.id).then((invoiceMaster) => {
            if (invoiceMaster) {
                this.invoiceMasterService
                    .delete(req.params.id)
                    .then(() => res.status(200).json())
                    .catch((err) => res.status(400).json(err));
            } else
                res.status(404).json({
                    message: `InvoiceMaster id:${req.params.id} does not exist`,
                });
        });
    }
}
