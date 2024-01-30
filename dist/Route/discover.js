"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const router = (0, express_1.Router)();
router.post("/", _Controller_1.DiscoverController.createDiscover);
router.delete("/:id", _Controller_1.DiscoverController.deleteDiscover);
router.patch("/:id", _Controller_1.DiscoverController.updateDiscover);
router.get("/", _Controller_1.DiscoverController.getDiscover);
router.get("/:id", _Controller_1.DiscoverController.findOneDiscover);
exports.default = router;
//# sourceMappingURL=discover.js.map