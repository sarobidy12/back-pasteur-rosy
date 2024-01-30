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
class PadcastController {
}
exports.default = PadcastController;
_a = PadcastController;
PadcastController.createPodcast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, seoDescription, textIcon, category, urlImg, urlUpload } = req.body;
    try {
        const saved = yield _Models_1.podcast.create({
            title,
            seoDescription,
            textIcon,
            category,
            urlImg,
            urlUpload,
        });
        res.status(200).send(saved);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
PadcastController.updatePodcast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { seoDescription, textIcon, category, urlImg, urlUpload } = req.body;
    try {
        const updated = yield _Models_1.podcast.findOneAndUpdate({
            _id: mongoose_1.Types.ObjectId(id),
        }, {
            seoDescription,
            textIcon,
            category,
            urlImg,
            urlUpload,
        }, { new: true });
        res.status(200).send(updated);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
PadcastController.deletePodcast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield _Models_1.podcast.deleteOne({
            _id: mongoose_1.Types.ObjectId(id),
        });
        res.status(200).send(deleted);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
PadcastController.getPodcast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Updated method name
    const { filter, category, page } = req.query;
    const skipCount = (+page - 1) * 10;
    try {
        const filterRequest = {
            title: { $regex: filter, $options: "i" },
        };
        if (category) {
            filterRequest.category = category;
        }
        const list = yield _Models_1.podcast
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
PadcastController.findbyTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const one = yield _Models_1.podcast.findOne({
            title: `${req.query.title}`,
        });
        res.status(200).send(one);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
PadcastController.lastedPodcast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const one = yield _Models_1.podcast.findOne({}).sort({ createdAt: -1 });
        res.status(200).send(one);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
//# sourceMappingURL=PodcastController.js.map