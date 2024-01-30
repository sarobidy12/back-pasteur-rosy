"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordOfDay = void 0;
const mongoose_1 = require("mongoose");
// Create Schema
const wordOfDaySchema = new mongoose_1.Schema({
    verse: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
});
wordOfDaySchema.method("transform", function () {
    const obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    return obj;
});
exports.WordOfDay = (0, mongoose_1.model)("WordOfDay", wordOfDaySchema);
//# sourceMappingURL=wordOfDay.js.map