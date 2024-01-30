"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
const mongoose_1 = require("mongoose");
// Create Schema
const AlbumSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    favorite: {
        type: Boolean,
        default: false,
        require: true,
    },
});
AlbumSchema.method("transform", function () {
    const obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    return obj;
});
exports.Album = (0, mongoose_1.model)("Album", AlbumSchema);
//# sourceMappingURL=Album.js.map