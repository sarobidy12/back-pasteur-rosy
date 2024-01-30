"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.category = void 0;
const mongoose_1 = require("mongoose");
// Create Schema
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    seoDescription: {
        type: String,
        require: true,
    },
    textIcon: {
        type: String,
        require: true,
    },
    favorite: {
        type: Boolean,
        require: true,
        default: false,
    },
});
CategorySchema.method("transform", function () {
    const obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    return obj;
});
exports.category = (0, mongoose_1.model)("Category", CategorySchema);
//# sourceMappingURL=Category.js.map