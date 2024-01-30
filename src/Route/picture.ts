import { Router } from "express";
import { PictureController } from "@Controller";
import { destinationFile } from "@Utils";

const router = Router();

router.post(
  "/upload",
  destinationFile.array("images"),
  PictureController.uploadPicture
);

router.get("/", PictureController.getPictureByAlbum);
router.delete("/", PictureController.deletePicture);

export default router;
