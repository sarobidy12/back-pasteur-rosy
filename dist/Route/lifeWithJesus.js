"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const router = (0, express_1.Router)();
router.post("/", _Controller_1.LifeWithJesusController.createLifeWithJesus);
router.delete("/:id", _Controller_1.LifeWithJesusController.deleteLifeWithJesus);
router.patch("/:id", _Controller_1.LifeWithJesusController.updateLifeWithJesus);
router.get("/", _Controller_1.LifeWithJesusController.getLifeWithJesus);
router.get("/findyText", _Controller_1.LifeWithJesusController.findbyTitle);
router.get("/:id", _Controller_1.LifeWithJesusController.findOneLifeWithJesus);
exports.default = router;
//# sourceMappingURL=lifeWithJesus.js.map