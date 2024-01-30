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
class AlbumController {
}
exports.default = AlbumController;
_a = AlbumController;
AlbumController.createAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const verify = yield _Models_1.Album.find({ name });
        if (verify.length) {
            res.status(500).send({ err: true, message: "album already existe." });
        }
        const albumSaved = yield _Models_1.Album.create({ name });
        res.status(200).send(albumSaved);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
AlbumController.getAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { favorite } = req.query;
    let logic = {};
    if (favorite) {
        logic.favorite = favorite;
    }
    console.log("logic", logic);
    try {
        const allAlbum = yield _Models_1.Album.find(logic);
        res.status(200).send(allAlbum);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
AlbumController.deleteAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { listID } = req.body;
    try {
        const albumDeleted = yield _Models_1.Album.deleteMany(listID);
        res.status(200).send("these album is deleted");
    }
    catch (err) {
        res.status(500).send(err);
    }
});
AlbumController.favoriteAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { album } = req.body;
    try {
        yield _Models_1.Album.updateMany({}, {
            $set: { favorite: false },
        });
        const array = yield [...album].map((x) => __awaiter(void 0, void 0, void 0, function* () {
            let update;
            try {
                update = yield _Models_1.Album.updateOne({
                    _id: mongoose_1.Types.ObjectId(x._id),
                }, {
                    $set: { favorite: true },
                });
            }
            catch (err) {
                console.error(err);
            }
            return update;
        }));
        const result = yield Promise.all(array);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
//# sourceMappingURL=AlbumController.js.map