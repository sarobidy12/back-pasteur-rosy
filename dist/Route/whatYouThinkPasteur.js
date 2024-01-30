"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const router = (0, express_1.Router)();
router.post("/", _Controller_1.WhatYouThinkPasteurController.createWhatYouThinkPastor);
router.delete("/:id", _Controller_1.WhatYouThinkPasteurController.deleteWhatYouThinkPastor);
router.patch("/:id", _Controller_1.WhatYouThinkPasteurController.answerWhatYouThinkPastor);
router.get("/", _Controller_1.WhatYouThinkPasteurController.getWhatYouThinkPastor);
router.get("/:id", _Controller_1.WhatYouThinkPasteurController.findOneWhatYouThinkPastorNoAnswered);
exports.default = router;
//# sourceMappingURL=whatYouThinkPasteur.js.map