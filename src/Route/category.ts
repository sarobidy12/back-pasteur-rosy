import { Router } from "express";
import { CategoryContoller } from "@Controller";

const router = Router();

router.post("/", CategoryContoller.createCategory);
router.delete("/:id", CategoryContoller.deleteCategory);
router.patch("/:id", CategoryContoller.updateCategory);
router.get("/", CategoryContoller.getCategory);
export default router;
