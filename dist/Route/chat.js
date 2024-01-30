"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const router = (0, express_1.Router)();
router.post("/", _Controller_1.ChatController.createChat);
router.delete("/:id", _Controller_1.ChatController.deleteChat);
router.patch("/:id", _Controller_1.ChatController.updateChat);
router.get("/", _Controller_1.ChatController.getChat);
router.get("/add/:id", _Controller_1.ChatController.addNewMember);
router.get("/info/:id", _Controller_1.ChatController.getById);
router.get("/convesation", _Controller_1.ChatController.getConvesation);
exports.default = router;
//# sourceMappingURL=chat.js.map