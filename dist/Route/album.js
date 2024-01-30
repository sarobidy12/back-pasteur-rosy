"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const router = (0, express_1.Router)();
router.post("/create", _Controller_1.AlbumController.createAlbum);
router.delete("/delete", _Controller_1.AlbumController.deleteAlbum);
router.patch("/favorite", _Controller_1.AlbumController.favoriteAlbum);
router.get("/", _Controller_1.AlbumController.getAlbum);
exports.default = router;
//# sourceMappingURL=album.js.map