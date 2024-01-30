"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trainning = void 0;
const mongoose_1 = require("mongoose");
// Create Schema
const ChildTrainnig = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
});
// Create Schema
const PictureSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
    },
    purpose: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    content: [ChildTrainnig],
});
PictureSchema.method("transform", function () {
    const obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    return obj;
});
exports.Trainning = (0, mongoose_1.model)("Trainnig", PictureSchema);
//# sourceMappingURL=trainning.js.map