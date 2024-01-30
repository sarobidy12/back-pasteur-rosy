"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teaching = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const content_1 = require("./content");
// Create Schema
const teachingSchema = new mongoose_1.Schema({
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
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    favorite: {
        type: Boolean,
        require: true,
    },
});
teachingSchema.method("transform", function () {
    const obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    return obj;
});
exports.teaching = (0, mongoose_1.model)("teaching", teachingSchema);
//# sourceMappingURL=teaching.js.map