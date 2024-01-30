"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const _Utils_1 = require("../Utils");
const router = (0, express_1.Router)();
router.post("/picture", _Utils_1.destinationFile.array("images"), _Controller_1.FileController.uploadFile);
router.post("/oneFile", _Utils_1.destinationFile.array("images"), _Controller_1.FileController.uploadOnePicture);
router.post("/since-editor", _Utils_1.destinationFile.array("image"), _Controller_1.FileController.sinceEditor);
exports.default = router;
//# sourceMappingURL=file.js.map