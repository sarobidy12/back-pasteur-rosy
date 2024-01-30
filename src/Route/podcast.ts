import { Router } from "express";
import { PodcastController } from "@Controller";

const router = Router();

router.post("/", PodcastController.createPodcast);
router.delete("/:id", PodcastController.deletePodcast);
router.patch("/:id", PodcastController.updatePodcast);
router.get("/", PodcastController.getPodcast);
router.get("/findbyTitle", PodcastController.findbyTitle);
router.get("/lastedPodcast", PodcastController.lastedPodcast);

export default router;
