import { Router } from "express";
import { wordOfDayController } from "@Controller";

const router = Router();

router.post("/", wordOfDayController.createWordOfDay);
router.patch("/:id", wordOfDayController.updateWordOfDay);
router.get("/", wordOfDayController.getWordOfDay);

export default router;
