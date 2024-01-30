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
class ChatController {
}
exports.default = ChatController;
_a = ChatController;
ChatController.createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        const saved = yield _Models_1.chat.create({
            name,
            description,
        });
        res.status(200).send(saved);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
ChatController.updateChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updated = yield _Models_1.chat.findOneAndUpdate({
            _id: mongoose_1.Types.ObjectId(id),
        }, {
            name,
            description,
        }, { new: true });
        res.status(200).send(updated);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
ChatController.deleteChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield _Models_1.chat.deleteOne({
            _id: mongoose_1.Types.ObjectId(id),
        });
        res.status(200).send(deleted);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
ChatController.getChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter } = req.query;
    try {
        const list = yield _Models_1.chat.find();
        res.status(200).send(list);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
ChatController.addNewMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user } = req.body;
    try {
        const list = yield _Models_1.chat.updateOne({
            _id: mongoose_1.Types.ObjectId(id),
        }, {
            content: {
                $push: user,
            },
        });
        res.status(200).send(list);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
ChatController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const list = yield _Models_1.chat.findById(id);
        res.status(200).send(list);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
ChatController.getConvesation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { canal, page } = req.query;
    try {
        const skipCount = (+page - 1) * 20;
        const list = yield _Models_1.Message.find({
            canal: mongoose_1.Types.ObjectId(canal),
        })
            .skip(skipCount)
            .sort({ createdAt: -1 })
            .limit(20)
            .populate("user")
            .exec();
        res.status(200).send(list);
    }
    catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
});
//# sourceMappingURL=ChatController.js.map