"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const _Models_1 = require("../Models");
const mongoose_1 = require("mongoose");
class biographyController {
}
exports.default = biographyController;
_a = biographyController;
biographyController.createBiography = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    try {
        const bio = yield _Models_1.biography.create({ content });
        res.status(200).send(bio);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
biographyController.updateBiography = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const bio = yield _Models_1.biography.updateOne({ _id: mongoose_1.Types.ObjectId(id) }, { content });
        res.status(200).send(bio);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
biographyController.getBiography = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [a, b, ...other] = yield _Models_1.biography.find();
        res.status(200).send(a);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
//# sourceMappingURL=BiographyController.js.map