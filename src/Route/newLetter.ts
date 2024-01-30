import { Router } from "express";
import { NewLetterController } from "@Controller";

const router = Router();

router.post("/add", NewLetterController.addNewLetter);
router.post("/send-all", NewLetterController.sendNewLetter);
router.get("/delete-user/:id", NewLetterController.RemoveNewLetter);
router.get("/count", NewLetterController.count);

export default router;
