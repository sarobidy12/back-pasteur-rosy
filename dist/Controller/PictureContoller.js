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
class PictureController {
}
exports.default = PictureController;
_a = PictureController;
PictureController.uploadPicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedText = decodeURIComponent(req.query.folder);
    try {
        const getOneAlbum = yield _Models_1.Album.findOne({ name: decodedText });
        const uploadedFiles = req.files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const savePicture = yield _Models_1.Picture.create({
                    album: mongoose_1.Types.ObjectId(getOneAlbum._id),
                    path: file.path,
                });
                return {
                    originalname: file.originalname,
                    filename: file.filename,
                    path: file.path,
                    _id: savePicture._id,
                };
            }
            catch (err) {
                console.error(err);
            }
            return {};
        }));
        const response = yield Promise.all(uploadedFiles);
        res.status(200).send(response);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
PictureController.getPictureByAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedText = decodeURIComponent(req.query.album);
    try {
        const albumSelected = yield _Models_1.Album.findOne({ name: decodedText });
        const getPictureByAlbum = yield _Models_1.Picture.find({
            album: albumSelected._id,
        });
        res.status(200).send(getPictureByAlbum);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
PictureController.deletePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { list } = req.body;
    try {
        const getPictureByAlbum = yield _Models_1.Picture.deleteMany({
            _id: {
                $in: list,
            },
        });
        res.status(200).send(getPictureByAlbum);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
//# sourceMappingURL=PictureContoller.js.map