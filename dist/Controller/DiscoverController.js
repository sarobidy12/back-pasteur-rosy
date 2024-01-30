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
class DiscoverController {
}
exports.default = DiscoverController;
_a = DiscoverController;
DiscoverController.createDiscover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, seoDescription, description, path, linkVideo, category } = req.body;
    try {
        const saved = yield _Models_1.discover.create({
            title,
            seoDescription,
            description,
            path,
            linkVideo,
            category,
        });
        res.status(200).send(saved);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
DiscoverController.updateDiscover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { seoDescription, description, path, linkVideo, category } = req.body;
    try {
        const updated = yield _Models_1.discover.findOneAndUpdate({
            _id: mongoose_1.Types.ObjectId(id),
        }, {
            seoDescription,
            description,
            path,
            linkVideo,
            category,
        }, { new: true });
        res.status(200).send(updated);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
DiscoverController.deleteDiscover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield _Models_1.discover.deleteOne({
            _id: mongoose_1.Types.ObjectId(id),
        });
        res.status(200).send(deleted);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
DiscoverController.getDiscover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, page, category } = req.query;
    try {
        const skipCount = (+page - 1) * 10;
        const filterRequest = {
            title: { $regex: filter, $options: "i" },
        };
        if (category) {
            filterRequest.category = category;
        }
        const list = yield _Models_1.discover
            .find(filterRequest)
            .skip(skipCount)
            .limit(10)
            .exec();
        res.status(200).send(list);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
DiscoverController.findOneDiscover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const list = yield _Models_1.discover.findById(id);
        res.status(200).send(list);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
//# sourceMappingURL=DiscoverController.js.map