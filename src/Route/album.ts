import { Router } from "express";
import { AlbumController } from "@Controller";

const router = Router();

router.post("/create", AlbumController.createAlbum);
router.delete("/delete", AlbumController.deleteAlbum);
router.patch("/favorite", AlbumController.favoriteAlbum);
router.get("/", AlbumController.getAlbum);
export default router;
