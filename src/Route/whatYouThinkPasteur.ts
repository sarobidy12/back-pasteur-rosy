import { Router } from "express";
import { WhatYouThinkPasteurController } from "@Controller";

const router = Router();

router.post("/", WhatYouThinkPasteurController.createWhatYouThinkPastor);
router.delete("/:id", WhatYouThinkPasteurController.deleteWhatYouThinkPastor);
router.patch("/:id", WhatYouThinkPasteurController.answerWhatYouThinkPastor);
router.get("/", WhatYouThinkPasteurController.getWhatYouThinkPastor);
router.get(
  "/:id",
  WhatYouThinkPasteurController.findOneWhatYouThinkPastorNoAnswered
);

export default router;
