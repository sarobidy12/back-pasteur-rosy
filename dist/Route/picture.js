"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const _Utils_1 = require("../Utils");
const router = (0, express_1.Router)();
router.post("/upload", _Utils_1.destinationFile.array("images"), _Controller_1.PictureController.uploadPicture);
router.get("/", _Controller_1.PictureController.getPictureByAlbum);
router.delete("/", _Controller_1.PictureController.deletePicture);
exports.default = router;
//# sourceMappingURL=picture.js.map