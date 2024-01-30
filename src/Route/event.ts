import { Router } from "express";
import { EventController } from "@Controller";

const router = Router();

router.post("/", EventController.createEvent);
router.delete("/:id", EventController.deleteEvent);
router.patch("/:id", EventController.updateEvent);
router.get("/", EventController.getEvent);
router.get("/filterByTitle", EventController.findbyTitle);
// router.get("/:id", EventController.findOneEvent);

export default router;
