"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestCkristian = void 0;
const mongoose_1 = require("mongoose");
const content_1 = require("./content");
// Create Schema
const bestCkristianSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
    },
    description: content_1.contentSchema,
    seoDescription: {
        type: String,
        require: true,
    },
    path: {
        type: String,
        require: true,
    },
    time: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
bestCkristianSchema.method("transform", function () {
    const obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    return obj;
});
exports.bestCkristian = (0, mongoose_1.model)("bestCkristian", bestCkristianSchema);
//# sourceMappingURL=Bestckristian.js.map