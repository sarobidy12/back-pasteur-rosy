import { Router } from "express";
import { supportController } from "@Controller";

const router = Router();

router.post("/", supportController.SendMail);

export default router;
