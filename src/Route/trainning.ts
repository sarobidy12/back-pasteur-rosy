import { Router } from "express";
import { TrainningController } from "@Controller";

const router = Router();

router.post("/", TrainningController.createTrainning);
router.delete("/:id", TrainningController.deleteTrainning);
router.patch("/:id", TrainningController.updateTrainning);
router.get("/", TrainningController.getTrainning);
router.get("/:id", TrainningController.findOneTrainning);
export default router;
