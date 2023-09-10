import { Request, Response } from "express";
import { ItemMasterService } from "../services";
import { ItemMaster } from "../models";
import { getPagingData } from "../helpers";

export class ItemMasterController {
  private itemMasterService: ItemMasterService;

  constructor() {
    this.itemMasterService = new ItemMasterService(ItemMaster);
  }

  getPaged(req: Request, res: Response) {
    const { page, size } = req.query;
    this.itemMasterService
      .getPaged(page, size)
      .then((items) => res.status(200).json(getPagingData(items)));
  }

  getAll(req: Request, res: Response) {
    this.itemMasterService
      .getAll()
      .then((items) => res.status(200).json(items));
  }

  getById(req: Request, res: Response) {
    this.itemMasterService.get(req.params.id).then((items) => {
      if (items) res.status(200).json(items);
      else
        res
          .status(404)
          .json({ message: `Item id:${req.params.id} does not exists` });
    });
  }
  ////POST REQUEST .......
  post(req: Request, res: Response) {
    let {
      jobWork,
      purpose,
      category,
      uom,
      price,
      unit,
      reason,
      hta,
      quantity,
      hsn,
    } = req.body;
    let item = new ItemMaster({
      jobWork,
      purpose,
      category,
      uom,
      price,
      unit,
      reason,
      hta,
      quantity,
      hsn,
    });
    this.itemMasterService
      .create(item)
      .then((items) => res.status(201).json(items))
      .catch((err) => res.status(400).json(err));
  }

  update(req: Request, res: Response) {
    let {
      id,
      jobWork,
      purpose,
      category,
      uom,
      price,
      unit,
      reason,
      hta,
      quantity,
      hsn,
    } = req.body;

    this.itemMasterService.get(req.params.id).then((item) => {
      if (item) {
        let updatedItemMaster = new ItemMaster({
          ...item.dataValues,
          jobWork,
          purpose,
          category,
          uom,
          price,
          unit,
          reason,
          hta,
          quantity,
          hsn,
        });

        this.itemMasterService
          .update(id, updatedItemMaster)
          .then(() => res.status(200).json(updatedItemMaster))
          .catch((err) => res.status(400).json(err));
      } else
        res
          .status(404)
          .json({ message: `Item id:${req.params.id} does not exists` });
    });
  }

  delete(req: Request, res: Response) {
    this.itemMasterService.get(req.params.id).then((item) => {
      if (item) {
        this.itemMasterService
          .delete(req.params.id)
          .then((item) => res.status(200).json())
          .catch((err) => res.status(400).json(err));
      } else
        res
          .status(404)
          .json({ message: `Item id:${req.params.id} does not exists` });
    });
  }
}
