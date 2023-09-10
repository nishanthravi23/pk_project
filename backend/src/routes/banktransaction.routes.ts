import { Router } from "express";
import { BankTransactionController } from "../controllers"; // Adjust the path based on your project structure

export class BankTransactionRoutes {
    private router: Router;
    private controller: BankTransactionController;

    constructor() {
        this.controller = new BankTransactionController();
        this.router = Router();
        this.routes();
    }

    private routes() {
        // Get all Bank Transactions
        this.router.get("/", (req, res) => this.controller.getAll(req, res));

        // Get Bank Transaction by ID
        this.router.get("/:id", (req, res) =>
            this.controller.getById(req, res)
        );

        // Create or update Bank Transaction
        this.router.post("/", (req, res) => this.controller.upsert(req, res));
        this.router.put("/:id", (req, res) => this.controller.upsert(req, res));

        // Delete Bank Transaction
        this.router.delete("/:id", (req, res) =>
            this.controller.delete(req, res)
        );
    }

    public getRouter() {
        return this.router;
    }
}
