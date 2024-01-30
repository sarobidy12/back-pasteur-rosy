"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
// Create Schema
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
        default: "USER",
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: true,
    },
    block: {
        type: Boolean,
        require: true,
        default: false,
    },
});
UserSchema.method("transform", function () {
    const obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    return obj;
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=User.js.map