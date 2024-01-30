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
class TrainningController {
}
exports.default = TrainningController;
_a = TrainningController;
TrainningController.createTrainning = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, purpose, description, content } = req.body;
    try {
        const saved = yield _Models_1.Trainning.create({
            title,
            purpose,
            description,
            content,
        });
        res.status(200).send(saved);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
TrainningController.updateTrainning = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const { title, purpose, description, content } = req.body;
    try {
        const updated = yield _Models_1.Trainning.updateOne({
            _id: mongoose_1.Types.ObjectId(_id),
        }, {
            title,
            purpose,
            description,
            content,
        });
        res.status(200).send(updated);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
TrainningController.deleteTrainning = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    try {
        const deleted = yield _Models_1.Trainning.deleteOne({
            _id: mongoose_1.Types.ObjectId(_id),
        });
        res.status(200).send(deleted);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
TrainningController.getTrainning = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter } = req.query;
    try {
        const list = yield _Models_1.Trainning.find();
        res.status(200).send(list);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
TrainningController.findOneTrainning = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const list = yield _Models_1.Trainning.findById(id);
        res.status(200).send(list);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
//# sourceMappingURL=TrainningController.js.map