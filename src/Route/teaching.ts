import { Router } from "express";
import { TeachingController } from "@Controller";

const router = Router();

router.post("/", TeachingController.createTeaching);
router.delete("/:id", TeachingController.deleteTeaching);
router.patch("/:id", TeachingController.updateTeaching);
router.get("/", TeachingController.getTeaching);
router.get("/findyText", TeachingController.findbyTitle);
router.get("/favorite", TeachingController.getFavorite);
router.get("/suggestion/:id", TeachingController.getSuggestionsByCategory);
//router.get("/:id", TeachingController.findOneTeaching);

export default router;
