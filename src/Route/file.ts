import { Router } from "express";
import { FileController } from "@Controller";
import { destinationFile } from "@Utils";

const router = Router();

router.post(
  "/picture",
  destinationFile.array("images"),
  FileController.uploadFile
);

router.post(
  "/oneFile",
  destinationFile.array("images") ,
  FileController.uploadOnePicture
);

router.post(
  "/since-editor",
  destinationFile.array("image") ,
  FileController.sinceEditor
);


export default router;
