import { Router } from "express";
import { UserController } from "@Controller";
import { checkRole, checkJwt } from "@Middlewares";
import { typeUser } from "@Utils";

const router = Router();

router.post("/login", UserController.login);
router.post("/comfirm", UserController.comfirmMail);
router.post("/sendMailResetPassowrd", UserController.sendMailResetPassowrd);
router.post("/register", UserController.register);
router.get("/", UserController.getUser);

router.patch(
  "/udpdate/:id",
  [checkJwt, checkRole(typeUser)],
  UserController.update
);

router.patch(
  "/resetPassword",
  [checkJwt, checkRole(typeUser)],
  UserController.resetPassword
);

router.patch("/admin-udpdate/:id", UserController.update);

router.post("/admin-create", UserController.register);

router.delete("/:id", UserController.deleteUser);

router.get("/getInfo", [checkJwt, checkRole(typeUser)], UserController.getInfo);

router.get("/block-user/:id", UserController.blockUser);

router.get("/count", UserController.count);

export default router;
