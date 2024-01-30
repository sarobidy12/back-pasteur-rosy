"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lifeWithJesus = void 0;
const mongoose_1 = require("mongoose");
const content_1 = require("./content");
// Create Schema
const LifeWithJesusSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
    },
    seoDescription: {
        type: String,
        require: true,
    },
    description: content_1.contentSchema,
    Date: {
        type: String,
        require: true,
        default: Date.now,
    },
    linkVideo: {
        type: String,
        require: false,
    },
    path: {
        type: String,
        require: true,
    },
});
LifeWithJesusSchema.method("transform", function () {
    const obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    return obj;
});
exports.lifeWithJesus = (0, mongoose_1.model)("LifeWithJesus", LifeWithJesusSchema);
//# sourceMappingURL=lifeWithJesus.js.map