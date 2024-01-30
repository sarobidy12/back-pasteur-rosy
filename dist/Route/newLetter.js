"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const router = (0, express_1.Router)();
router.post("/add", _Controller_1.NewLetterController.addNewLetter);
router.post("/send-all", _Controller_1.NewLetterController.sendNewLetter);
router.get("/delete-user/:id", _Controller_1.NewLetterController.RemoveNewLetter);
router.get("/count", _Controller_1.NewLetterController.count);
exports.default = router;
//# sourceMappingURL=newLetter.js.map