"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const router = (0, express_1.Router)();
router.post("/", _Controller_1.wordOfDayController.createWordOfDay);
router.patch("/:id", _Controller_1.wordOfDayController.updateWordOfDay);
router.get("/", _Controller_1.wordOfDayController.getWordOfDay);
exports.default = router;
//# sourceMappingURL=wordOfDay.js.map