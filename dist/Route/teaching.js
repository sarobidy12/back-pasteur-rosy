"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const router = (0, express_1.Router)();
router.post("/", _Controller_1.TeachingController.createTeaching);
router.delete("/:id", _Controller_1.TeachingController.deleteTeaching);
router.patch("/:id", _Controller_1.TeachingController.updateTeaching);
router.get("/", _Controller_1.TeachingController.getTeaching);
router.get("/findyText", _Controller_1.TeachingController.findbyTitle);
router.get("/favorite", _Controller_1.TeachingController.getFavorite);
router.get("/suggestion/:id", _Controller_1.TeachingController.getSuggestionsByCategory);
//router.get("/:id", TeachingController.findOneTeaching);
exports.default = router;
//# sourceMappingURL=teaching.js.map