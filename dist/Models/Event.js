"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const mongoose_1 = require("mongoose");
const content_1 = require("./content");
// Create Schema
const EventSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
    },
    shortDescription: {
        type: String,
        require: true,
    },
    seoDescription: {
        type: String,
        require: true,
    },
    description: content_1.contentSchema,
    date: {
        type: Date,
        require: true,
    },
    path: {
        type: String,
        require: true,
    },
    place: {
        type: String,
        require: true,
    },
    live: {
        type: String,
        require: true,
    },
});
EventSchema.method("transform", function () {
    const obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    return obj;
});
exports.event = (0, mongoose_1.model)("Event", EventSchema);
//# sourceMappingURL=Event.js.map