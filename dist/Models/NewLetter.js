"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewLetter = exports.newLetterSchema = void 0;
const mongoose_1 = require("mongoose");
// Create Schema
exports.newLetterSchema = new mongoose_1.Schema({
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
});
exports.newLetterSchema.method("transform", function () {
    const obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    //   delete obj._id;
    return obj;
});
exports.NewLetter = (0, mongoose_1.model)("NewLetter", exports.newLetterSchema);
//# sourceMappingURL=NewLetter.js.map