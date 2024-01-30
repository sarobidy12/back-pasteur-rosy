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
class FileController {
}
exports.default = FileController;
_a = FileController;
FileController.uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedFiles = req.files.map((file) => ({
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
    }));
    res.status(200).send(uploadedFiles);
});
FileController.uploadOnePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).send({
            originalname: req.files[0].originalname,
            filename: req.files[0].filename,
            path: req.files[0].path,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
});
FileController.sinceEditor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).send({
            success: 1,
            file: {
                url: `${process.env.BACK_URI}/${req.files[0].path}`,
                // ... and any additional fields you want to store, such as width, height, color, extension, etc
            },
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
});
//# sourceMappingURL=FileController.js.map