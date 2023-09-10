import { Request, Response } from "express";
import { ItemMasterService } from "../services";
import { ItemMaster, Department } from "../models";
import { getPagingData } from "../helpers";
import { Op, Sequelize } from "sequelize";

export class OtController {
  private itemMasterService: ItemMasterService;

  constructor() {
    this.itemMasterService = new ItemMasterService(ItemMaster);
  }

  private options = {
    attributes: [
      "id",
      "category",
      "reason",
      "unit",
      "price",
      "deptId",
      [Sequelize.col("department.name"), "deptName"],
    ],
    include: [
      {
        model: Department,
        as: "department",
      },
    ],
  };

  getPaged(req: Request, res: Response) {
    const { page, size } = req.query;

    this.itemMasterService.getPaged(page, size).then((ot) => {
      res.status(200).json(getPagingData(ot));
    });
  }

  getAll(req: Request, res: Response) {
    this.itemMasterService.getAll(this.options).then((ot) => {
      res.status(200).json(ot);
    });
  }

  getById(req: Request, res: Response) {
    this.itemMasterService.get(req.params.id, this.options).then((ot) => {
      if (ot) res.status(200).json(ot);
      else
        res.status(404).json({
          message: `Item id:${req.params.id} does not exists`,
        });
    });
  }

  post(req: Request, res: Response) {
    let { date, employeeId, hours, isOt, isSunday } = req.body;
    let ot = new ItemMaster({ date, employeeId, hours, isOt, isSunday });
    this.itemMasterService
      .create(ot)
      .then((ot) => res.status(201).json(ot))
      .catch((err) => res.status(400).json(err));
  }

  update(req: Request, res: Response) {
    let data = req.body;

    this.itemMasterService.get(req.params.id).then((ot) => {
      if (ot) {
        let updatedOt = new ItemMaster({
          ...ot.dataValues,
          ...data,
        });

        this.itemMasterService
          .update(req.params.id, updatedOt)
          .then(() => res.status(200).json(updatedOt))
          .catch((err) => res.status(400).json(err));
      } else
        res.status(404).json({
          message: `Item id:${req.params.id} does not exists`,
        });
    });
  }

  delete(req: Request, res: Response) {
    this.itemMasterService.get(req.params.id).then((ot) => {
      if (ot) {
        this.itemMasterService
          .delete(req.params.id)
          .then((ot) => res.status(200).json())
          .catch((err) => res.status(400).json(err));
      } else
        res.status(404).json({
          message: `Item id:${req.params.id} does not exists`,
        });
    });
  }
}
