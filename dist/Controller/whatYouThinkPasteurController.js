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
class WhatYouThinkPastorController {
}
exports.default = WhatYouThinkPastorController;
_a = WhatYouThinkPastorController;
WhatYouThinkPastorController.createWhatYouThinkPastor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message, resumeQuestion, category } = req.body;
    try {
        const saved = yield _Models_1.whatYouThinkPastor.create({
            name,
            email,
            message,
            resumeQuestion,
            category,
        });
        res.status(200).send(saved);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
WhatYouThinkPastorController.answerWhatYouThinkPastor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { answer, linkVideo } = req.body;
    try {
        const updated = yield _Models_1.whatYouThinkPastor.updateOne({
            _id: mongoose_1.Types.ObjectId(id),
        }, {
            answer,
            linkVideo,
            answered: true,
        });
        res.status(200).send(Object.assign(Object.assign({}, updated), { _id: id }));
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
WhatYouThinkPastorController.deleteWhatYouThinkPastor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield _Models_1.whatYouThinkPastor
            .deleteOne({
            _id: mongoose_1.Types.ObjectId(id),
        })
            .exec();
        res.status(200).send(deleted);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
WhatYouThinkPastorController.getWhatYouThinkPastor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, answered, page, category, email } = req.query;
    try {
        const skipCount = (+page - 1) * 10;
        const filterRequest = {
            resumeQuestion: { $regex: filter, $options: "i" },
            answered: answered === "true" ? true : false,
        };
        if (category) {
            filterRequest.category = category;
        }
        if (email) {
            filterRequest.email = email;
        }
        const list = yield _Models_1.whatYouThinkPastor
            .find(filterRequest)
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
WhatYouThinkPastorController.findOneWhatYouThinkPastorNoAnswered = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const one = yield _Models_1.whatYouThinkPastor.findById(id);
        res.status(200).send(one);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
//# sourceMappingURL=whatYouThinkPasteurController.js.map