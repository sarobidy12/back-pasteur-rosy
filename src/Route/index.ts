import { Router } from "express";
import User from "./User";
import File from "./file";
import Album from "./album";
import Picture from "./picture";
import bestckristian from "./bestckristian";
import event from "./event";
import category from "./category";
import lifeWithJesus from "./lifeWithJesus";
import whatYouThinkPasteur from "./whatYouThinkPasteur";
import chat from "./chat";
import biography from "./biography";
import podcast from "./podcast";
import discover from "./discover";
import teaching from "./teaching";
import newLetter from "./newLetter";
import wordOfDay from "./wordOfDay";
import support from "./support";

const routes = Router();

routes.use("/user", User);
routes.use("/file", File);
routes.use("/album", Album);
routes.use("/picture", Picture);
routes.use("/bestckristian", bestckristian);
routes.use("/event", event);
routes.use("/category", category);
routes.use("/lifeWithJesus", lifeWithJesus);
routes.use("/whatYouThinkPasteur", whatYouThinkPasteur);
routes.use("/chat", chat);
routes.use("/biography", biography);
routes.use("/podcast", podcast);
routes.use("/discover", discover);
routes.use("/teaching", teaching);
routes.use("/wordOfDay", wordOfDay);
routes.use("/newLetter", newLetter);
routes.use("/support", support);

export default routes;
