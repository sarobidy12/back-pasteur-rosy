"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const router = (0, express_1.Router)();
router.post("/", _Controller_1.EventController.createEvent);
router.delete("/:id", _Controller_1.EventController.deleteEvent);
router.patch("/:id", _Controller_1.EventController.updateEvent);
router.get("/", _Controller_1.EventController.getEvent);
router.get("/filterByTitle", _Controller_1.EventController.findbyTitle);
// router.get("/:id", EventController.findOneEvent);
exports.default = router;
//# sourceMappingURL=event.js.map