import { Router } from "express";
import { BestCkristianController } from "@Controller";

const router = Router();

router.post("/", BestCkristianController.createBestCkristian);
router.delete("/:id", BestCkristianController.deleteBestCkristian);
router.patch("/:id", BestCkristianController.updateBestCkristian);
router.get("/", BestCkristianController.getBestCkristian);
router.get("/findyText", BestCkristianController.findbyTitle);
router.get("/:id", BestCkristianController.findOneBestCkristian);

export default router;
