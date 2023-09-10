import { Router } from "express";
import { ProformaController } from "../controllers"; // Adjust the path based on your project structure
import { log } from "console";

export class ProformaRoutes {
    private router: Router;
    private controller: ProformaController;

    constructor() {
        this.controller = new ProformaController();
        this.router = Router();
        this.routes();
    }

    private routes() {
        // Get all Proformas
        this.router.get("/", (req, res) => this.controller.getAll(req, res));

        // Get a Proforma by ID
        this.router.get("/:id", (req, res) =>
            this.controller.getById(req, res)
        );

        // Create or update a Proforma
        this.router.post("/", (req, res) => this.controller.upsert(req, res));
        this.router.put("/:id", (req, res) => this.controller.upsert(req, res));

        // Delete a Proforma
        this.router.delete("/:id", (req, res) =>
            this.controller.delete(req, res)
        );
    }

    public getRouter() {
        return this.router;
    }
}
