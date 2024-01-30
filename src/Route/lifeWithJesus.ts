import { Router } from "express";
import { LifeWithJesusController } from "@Controller";

const router = Router();

router.post("/", LifeWithJesusController.createLifeWithJesus);
router.delete("/:id", LifeWithJesusController.deleteLifeWithJesus);
router.patch("/:id", LifeWithJesusController.updateLifeWithJesus);
router.get("/", LifeWithJesusController.getLifeWithJesus);
router.get("/findyText", LifeWithJesusController.findbyTitle);
router.get("/:id", LifeWithJesusController.findOneLifeWithJesus);

export default router;
