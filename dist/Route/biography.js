"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const router = (0, express_1.Router)();
router.post("/", _Controller_1.BiographyController.createBiography);
router.patch("/:id", _Controller_1.BiographyController.updateBiography);
router.get("/", _Controller_1.BiographyController.getBiography);
exports.default = router;
//# sourceMappingURL=biography.js.map