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
const _Utils_1 = require("../Utils");
const _Models_1 = require("../Models");
const mongoose_1 = require("mongoose");
class NewLetterController {
}
exports.default = NewLetterController;
_a = NewLetterController;
NewLetterController.addNewLetter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lastName, email } = req.body;
    try {
        const verify = yield _Models_1.NewLetter.findOne({
            email,
        });
        if (verify || !email) {
            throw verify;
        }
        const saved = yield _Models_1.NewLetter.create({
            lastName,
            email,
        });
        res.status(200).send(saved);
    }
    catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
});
NewLetterController.RemoveNewLetter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const saved = yield _Models_1.NewLetter.deleteOne({ _id: mongoose_1.Types.ObjectId(id) });
        res.status(200).send(`<div>
        <h2>Vous ne recevrez plus de newLetter.</h2>
        </div>`);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
NewLetterController.sendNewLetter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, title } = req.body;
    try {
        (0, _Utils_1.functionSenderNewLetter)(title, content);
        res.status(200).send({ success: true });
    }
    catch (err) {
        console.log("test");
        res.status(500).send(err);
    }
});
NewLetterController.count = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield _Models_1.NewLetter.find();
        res.status(200).send({ success: true, count: list.length });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
//# sourceMappingURL=NewLetterController.js.map