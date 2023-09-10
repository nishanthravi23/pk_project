import { Router } from "express";
import { QuotationController } from "../controllers"; // Adjust the path based on your project structure

export class QuotationRoutes {
    private router: Router;
    private controller: QuotationController;

    constructor() {
        this.controller = new QuotationController();
        this.router = Router();
        this.routes();
    }

    private routes() {
        // Get all Quotations
        this.router.get("/", (req, res) => this.controller.getAll(req, res));

        // Get a Quotation by ID
        this.router.get("/:id", (req, res) =>
            this.controller.getById(req, res)
        );

        // Create or update a Quotation
        this.router.post("/", (req, res) => this.controller.upsert(req, res));
        this.router.put("/:id", (req, res) => this.controller.upsert(req, res));

        // Delete a Quotation
        this.router.delete("/:id", (req, res) =>
            this.controller.delete(req, res)
        );
    }

    public getRouter() {
        return this.router;
    }
}
