import { Router } from "express";
import { BiographyController } from "@Controller";

const router = Router();

router.post("/", BiographyController.createBiography);
router.patch("/:id", BiographyController.updateBiography);
router.get("/", BiographyController.getBiography);

export default router;
