import { Router } from "express";
import { BankDetailsController } from "../controllers"; // Adjust the path based on your project structure

export class BankDetailsRoutes {
    private router: Router;
    private controller: BankDetailsController;

    constructor() {
        this.controller = new BankDetailsController();
        this.router = Router();
        this.routes();
    }

    private routes() {
        // Get all Bank Details
        this.router.get("/", (req, res) => this.controller.getAll(req, res));

        // Get Bank Details by ID
        this.router.get("/:id", (req, res) =>
            this.controller.getById(req, res)
        );

        // Create or update Bank Details
        this.router.post("/", (req, res) => this.controller.upsert(req, res));
        this.router.put("/:id", (req, res) => this.controller.upsert(req, res));

        // Delete Bank Details
        this.router.delete("/:id", (req, res) =>
            this.controller.delete(req, res)
        );
    }

    public getRouter() {
        return this.router;
    }
}
