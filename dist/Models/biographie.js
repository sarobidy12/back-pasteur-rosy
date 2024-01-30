"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.biography = void 0;
const mongoose_1 = require("mongoose");
const content_1 = require("./content");
// Create Schema
const BiographySchema = new mongoose_1.Schema({
    content: content_1.contentSchema,
});
BiographySchema.method("transform", function () {
    const obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    return obj;
});
exports.biography = (0, mongoose_1.model)("biography", BiographySchema);
//# sourceMappingURL=biographie.js.map