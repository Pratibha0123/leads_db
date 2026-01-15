import { Router } from "express";
import {
    listLeads,
    getLead,
    createLead,
    updateLead,
    deleteLead
} from "../controllers/leadController.js";

const router = Router();

router.get("/", listLeads);
router.get("/:id", getLead);
router.post("/", createLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;