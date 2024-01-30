"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _Controller_1 = require("../Controller");
const router = (0, express_1.Router)();
router.post("/", _Controller_1.PodcastController.createPodcast);
router.delete("/:id", _Controller_1.PodcastController.deletePodcast);
router.patch("/:id", _Controller_1.PodcastController.updatePodcast);
router.get("/", _Controller_1.PodcastController.getPodcast);
router.get("/findbyTitle", _Controller_1.PodcastController.findbyTitle);
router.get("/lastedPodcast", _Controller_1.PodcastController.lastedPodcast);
exports.default = router;
//# sourceMappingURL=podcast.js.map