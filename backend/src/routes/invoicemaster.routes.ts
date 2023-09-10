import { Router } from "express";
import { InvoiceMasterController } from "../controllers"; // Adjust the path based on your project structure

export class InvoiceMasterRoutes {
    private router: Router;
    private controller: InvoiceMasterController;

    constructor() {
        this.controller = new InvoiceMasterController();
        this.router = Router();
        this.routes();
    }

    private routes() {
        // Get all InvoiceMasters
        this.router.get("/", (req, res) => this.controller.getAll(req, res));

        // Get an InvoiceMaster by ID
        this.router.get("/:id", (req, res) =>
            this.controller.getById(req, res)
        );

        // Create or update an InvoiceMaster
        this.router.post("/", (req, res) => this.controller.upsert(req, res));
        this.router.put("/:id", (req, res) => this.controller.upsert(req, res));

        // Delete an InvoiceMaster
        this.router.delete("/:id", (req, res) =>
            this.controller.delete(req, res)
        );
    }

    public getRouter() {
        return this.router;
    }
}
