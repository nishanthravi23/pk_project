import { Router } from "express";
import { ItemMasterController } from "../controllers";
import { verifyToken } from "../middleware";
// import { verifyToken } from "../middleware";

export class ItemMasterRoutes {
  private router: Router;
  private controller: ItemMasterController;

  constructor() {
    this.controller = new ItemMasterController();
    this.router = Router();
    this.routes();
  }

  private routes() {
    //! GetPaged
    this.router.get("/page", (req, res) => this.controller.getPaged(req, res));

    //! GetAll
    this.router.get("/", (req, res) => this.controller.getAll(req, res));

    //! GetById
    this.router.get("/:id", (req, res) => this.controller.getById(req, res));

    //! Register
    this.router.post("/", (req, res) => this.controller.post(req, res));

    //! Put
    this.router.put("/:id", (req, res) => this.controller.update(req, res));

    //! Delete
    this.router.delete("/:id", (req, res) => this.controller.delete(req, res));
  }

  public getRouter() {
    return this.router;
  }
}
