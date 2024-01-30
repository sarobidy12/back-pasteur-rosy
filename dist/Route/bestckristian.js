"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const router = (0, express_1.Router)();
router.post("/", _Controller_1.BestCkristianController.createBestCkristian);
router.delete("/:id", _Controller_1.BestCkristianController.deleteBestCkristian);
router.patch("/:id", _Controller_1.BestCkristianController.updateBestCkristian);
router.get("/", _Controller_1.BestCkristianController.getBestCkristian);
router.get("/findyText", _Controller_1.BestCkristianController.findbyTitle);
router.get("/:id", _Controller_1.BestCkristianController.findOneBestCkristian);
exports.default = router;
//# sourceMappingURL=bestckristian.js.map