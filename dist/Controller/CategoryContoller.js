"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const _Models_1 = require("../Models");
const mongoose_1 = require("mongoose");
class CategoryController {
}
exports.default = CategoryController;
_a = CategoryController;
CategoryController.createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, seoDescription, textIcon, favorite } = req.body;
    try {
        const verify = yield _Models_1.category.findOne({ name });
        if (verify) {
            res.status(500).send({ err: true, message: "category already exist" });
        }
        const saved = yield _Models_1.category.create({
            name,
            seoDescription,
            textIcon,
            favorite,
        });
        res.status(200).send(saved);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
CategoryController.updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, seoDescription, textIcon, favorite } = req.body;
    try {
        const updated = yield _Models_1.category
            .findOneAndUpdate({
            _id: mongoose_1.Types.ObjectId(id),
        }, {
            name,
            seoDescription,
            textIcon,
            favorite,
        }, { new: true })
            .exec();
        res.status(200).send(updated);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
CategoryController.deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield _Models_1.category.deleteOne({
            _id: mongoose_1.Types.ObjectId(id),
        });
        res.status(200).send(deleted);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
CategoryController.getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, favorite } = req.query;
    const queryFilter = {};
    if (favorite === "true") {
        queryFilter.favorite = favorite;
    }
    try {
        const list = yield _Models_1.category.find(queryFilter);
        res.status(200).send(list);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
//# sourceMappingURL=CategoryContoller.js.map