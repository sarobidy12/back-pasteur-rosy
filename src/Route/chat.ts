import { Router } from "express";
import { ChatController } from "@Controller";

const router = Router();

router.post("/", ChatController.createChat);
router.delete("/:id", ChatController.deleteChat);
router.patch("/:id", ChatController.updateChat);
router.get("/", ChatController.getChat);
router.get("/add/:id", ChatController.addNewMember);
router.get("/info/:id", ChatController.getById);
router.get("/convesation", ChatController.getConvesation);

export default router;
