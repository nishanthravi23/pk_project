import { Request, Response } from "express";
import { BankDetailsService } from "../services"; // Assuming you have a BankDetailsService
import { BankDetails } from "../models"; // Assuming you have a BankDetails model
import { getPagingData } from "../helpers";
import { sequelize } from "../db";
import { Op } from "sequelize";

export class BankDetailsController {
    private bankDetailsService: BankDetailsService;

    constructor() {
        this.bankDetailsService = new BankDetailsService(BankDetails);
    }

    options = {}; // You can add any options you need here

    getPaged(req: Request, res: Response) {
        const { page, size } = req.query;
        this.bankDetailsService
            .getPaged(page, size, this.options)
            .then((bankDetails) =>
                res.status(200).json(getPagingData(bankDetails))
            );
    }

    getAll(req: Request, res: Response) {
        this.bankDetailsService
            .getAll()
            .then((bankDetails) => res.status(200).json(bankDetails));
    }

    getById(req: Request, res: Response) {
        this.bankDetailsService
            .get(req.params.id, this.options)
            .then((bankDetails) => {
                if (bankDetails) res.status(200).json(bankDetails);
                else
                    res.status(404).json({
                        message: `BankDetails id:${req.params.id} does not exist`,
                    });
            });
    }

    async upsert(req: Request, res: Response) {
        let { id, bank_name, account_name, account_no, branch, account_type } = req.body;

        let bankDetails: any = {
            bank_name,
            account_name,
            account_no,
            branch,
            account_type,
        };
        if (id) bankDetails = { ...bankDetails, id };

        const t = await sequelize.transaction();

        try {
            // Creating or Updating bank details
            const [createdBankDetails, isExist] = await BankDetails.upsert(
                bankDetails,
                {
                    transaction: t,
                    returning: true,
                }
            );

            t.commit();
            res.status(201).json(createdBankDetails);
        } catch (err) {
            t.rollback();
            res.status(400).json(err);
            console.log(err);
        }
    }

    delete(req: Request, res: Response) {
        this.bankDetailsService.get(req.params.id).then((bankDetails) => {
            if (bankDetails) {
                this.bankDetailsService
                    .delete(req.params.id)
                    .then(() => res.status(200).json())
                    .catch((err) => res.status(400).json(err));
            } else
                res.status(404).json({
                    message: `BankDetails id:${req.params.id} does not exist`,
                });
        });
    }
}
