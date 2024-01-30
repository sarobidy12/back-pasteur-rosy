"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const router = (0, express_1.Router)();
router.post("/", _Controller_1.TrainningController.createTrainning);
router.delete("/:id", _Controller_1.TrainningController.deleteTrainning);
router.patch("/:id", _Controller_1.TrainningController.updateTrainning);
router.get("/", _Controller_1.TrainningController.getTrainning);
router.get("/:id", _Controller_1.TrainningController.findOneTrainning);
exports.default = router;
//# sourceMappingURL=trainning.js.map