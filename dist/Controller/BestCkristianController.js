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
class bestCkristianController {
}
exports.default = bestCkristianController;
_a = bestCkristianController;
bestCkristianController.createBestCkristian = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, seoDescription, path, time } = req.body;
    console.log("description", description);
    try {
        const saved = yield _Models_1.bestCkristian.create({
            title,
            description,
            seoDescription,
            path,
            time,
        });
        res.status(200).send(saved);
    }
    catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
});
bestCkristianController.updateBestCkristian = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, seoDescription, path, time } = req.body;
    try {
        const updated = yield _Models_1.bestCkristian
            .findOneAndUpdate({
            _id: mongoose_1.Types.ObjectId(id),
        }, {
            description,
            seoDescription,
            path,
            time,
        }, { new: true })
            .exec();
        res.status(200).send(updated);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
bestCkristianController.deleteBestCkristian = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield _Models_1.bestCkristian.deleteOne({
            _id: mongoose_1.Types.ObjectId(id),
        });
        res.status(200).send(deleted);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
bestCkristianController.getBestCkristian = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, page } = req.query;
    try {
        const skipCount = (+page - 1) * 10;
        const list = yield _Models_1.bestCkristian
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
bestCkristianController.findOneBestCkristian = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const list = yield _Models_1.bestCkristian.findById(id);
        res.status(200).send(list);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
bestCkristianController.findbyTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const one = yield _Models_1.bestCkristian.findOne({
            title: `${req.query.title}`,
        });
        res.status(200).send(one);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
//# sourceMappingURL=BestCkristianController.js.map