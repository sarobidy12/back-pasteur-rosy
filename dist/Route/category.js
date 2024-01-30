"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const router = (0, express_1.Router)();
router.post("/", _Controller_1.CategoryContoller.createCategory);
router.delete("/:id", _Controller_1.CategoryContoller.deleteCategory);
router.patch("/:id", _Controller_1.CategoryContoller.updateCategory);
router.get("/", _Controller_1.CategoryContoller.getCategory);
exports.default = router;
//# sourceMappingURL=category.js.map