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
class EventController {
}
exports.default = EventController;
_a = EventController;
EventController.createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, shortDescription, seoDescription, description, date, path, place, live, } = req.body;
    try {
        const saved = yield _Models_1.event.create({
            shortDescription,
            seoDescription,
            description,
            date,
            path,
            place,
            live,
            title,
        });
        (0, _Utils_1.functionSenderNewLetter)(title, description);
        res.status(200).send(saved);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
EventController.updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { shortDescription, seoDescription, description, date, path, place, live, } = req.body;
    try {
        const updated = yield _Models_1.event.findOneAndUpdate({
            _id: mongoose_1.Types.ObjectId(id),
        }, {
            shortDescription,
            seoDescription,
            description,
            date,
            path,
            place,
            live,
        }, { new: true });
        (0, _Utils_1.functionSenderNewLetter)("[EVENEMENT MODIFIER]", description);
        res.status(200).send(updated);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
EventController.deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield _Models_1.event.deleteOne({
            _id: mongoose_1.Types.ObjectId(id),
        });
        res.status(200).send(deleted);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
EventController.getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, page } = req.query;
    try {
        const list = yield _Models_1.event.find({}).sort({
            date: "desc",
        });
        res.status(200).send(list);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
EventController.findOneEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("call");
    try {
        const list = yield _Models_1.event.findById(id);
        res.status(200).send(list);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
EventController.findbyTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const one = yield _Models_1.event.findOne({
            title: `${req.query.title}`,
        });
        res.status(200).send(one);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
//# sourceMappingURL=EventController.js.map