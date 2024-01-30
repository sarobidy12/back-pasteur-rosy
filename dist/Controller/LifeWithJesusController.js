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
class LifeWithJesusController {
}
exports.default = LifeWithJesusController;
_a = LifeWithJesusController;
LifeWithJesusController.createLifeWithJesus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, seoDescription, description, path, linkVideo } = req.body;
    try {
        const saved = yield _Models_1.lifeWithJesus.create({
            title,
            seoDescription,
            description,
            path,
            linkVideo,
        });
        res.status(200).send(saved);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
LifeWithJesusController.updateLifeWithJesus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, seoDescription, description, path, linkVideo } = req.body;
    try {
        const updated = yield _Models_1.lifeWithJesus.findOneAndUpdate({
            _id: mongoose_1.Types.ObjectId(id),
        }, {
            seoDescription,
            description,
            path,
            linkVideo,
        }, { new: true });
        res.status(200).send(updated);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
LifeWithJesusController.deleteLifeWithJesus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield _Models_1.lifeWithJesus.deleteOne({
            _id: mongoose_1.Types.ObjectId(id),
        });
        res.status(200).send(deleted);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
LifeWithJesusController.getLifeWithJesus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, page } = req.query;
    try {
        const skipCount = (+page - 1) * 10;
        const list = yield _Models_1.lifeWithJesus
            .find({
            title: { $regex: filter, $options: "i" },
        })
            .skip(skipCount)
            .limit(10)
            .exec();
        res.status(200).send(list);
    }
    catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
});
LifeWithJesusController.findOneLifeWithJesus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const list = yield _Models_1.lifeWithJesus.findById(id);
        res.status(200).send(list);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
LifeWithJesusController.findbyTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const one = yield _Models_1.lifeWithJesus.findOne({
            title: `${req.query.title}`,
        });
        res.status(200).send(one);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
//# sourceMappingURL=LifeWithJesusController.js.map