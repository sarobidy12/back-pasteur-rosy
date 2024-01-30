import { Router } from "express";
import { DiscoverController } from "@Controller";

const router = Router();

router.post("/", DiscoverController.createDiscover);
router.delete("/:id", DiscoverController.deleteDiscover);
router.patch("/:id", DiscoverController.updateDiscover);
router.get("/", DiscoverController.getDiscover);
router.get("/:id", DiscoverController.findOneDiscover);

export default router;
