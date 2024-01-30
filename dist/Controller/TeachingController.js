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
const _Models_1 = require("../Models"); // Updated import and model name
const mongoose_1 = require("mongoose");
class TeachingController {
}
exports.default = TeachingController;
_a = TeachingController;
// Updated class name
TeachingController.createTeaching = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Updated method name
    const { title, seoDescription, description, path, linkVideo, category, favorite, } = req.body;
    try {
        const saved = yield _Models_1.teaching.create({
            // Updated model name
            title,
            seoDescription,
            description,
            path,
            linkVideo,
            category,
            favorite,
        });
        res.status(200).send(saved);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
TeachingController.updateTeaching = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Updated method name
    const { id } = req.params;
    const { seoDescription, description, path, linkVideo, category, favorite } = req.body;
    try {
        const updated = yield _Models_1.teaching.findOneAndUpdate({
            // Updated model name
            _id: mongoose_1.Types.ObjectId(id),
        }, {
            seoDescription,
            description,
            path,
            category,
            linkVideo,
            favorite,
        }, { new: true });
        res.status(200).send(updated);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
TeachingController.deleteTeaching = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Updated method name
    const { id } = req.params;
    try {
        const deleted = yield _Models_1.teaching.deleteOne({
            // Updated model name
            _id: mongoose_1.Types.ObjectId(id),
        });
        res.status(200).send(deleted);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
TeachingController.getTeaching = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const list = yield _Models_1.teaching
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
TeachingController.findOneTeaching = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Updated method name
    const { id } = req.params;
    try {
        const item = yield _Models_1.teaching.findById(id); // Updated model name
        res.status(200).send(item);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
TeachingController.findbyTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("call", req.query.title.trim());
    try {
        const one = yield _Models_1.teaching.findOne({
            title: `${req.query.title.trim()}`,
        });
        console.log("one", one);
        res.status(200).send(one);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
TeachingController.getFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Updated method name
    try {
        const list = yield _Models_1.teaching
            .find({ favorite: true })
            .limit(10)
            .exec();
        res.status(200).send(list);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
TeachingController.getSuggestionsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Assuming the item ID is passed as a parameter in the request
        const itemId = req.params.itemId;
        // Find the item by ID
        const currentItem = yield _Models_1.teaching.findById(itemId).exec();
        if (!currentItem) {
            return res
                .status(404)
                .json({ success: false, error: "Item not found" });
        }
        // Get the category of the current item
        const currentCategory = currentItem.category;
        // Retrieve random items from the same category, excluding the current item
        const randomItems = yield _Models_1.teaching.aggregate([
            {
                $match: {
                    category: currentCategory,
                    _id: { $ne: mongoose_1.Types.ObjectId(itemId) },
                },
            },
            { $sample: { size: 4 } }, // Adjust the size as needed for the number of random items
        ]);
        // Include the current item in the response
        const suggestions = [currentItem, ...randomItems];
        res.json({ success: true, suggestions });
    }
    catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});
//# sourceMappingURL=TeachingController.js.map