import express from "express";
import { getGalleries, getLatestGalleries, getPopularGalleries, getGalleryRating, showGallery } from "../controllers/galleryController.mjs";

const router = express.Router();

router.get("/", getGalleries);
router.get("/latest", getLatestGalleries);
router.get("/popular", getPopularGalleries);
router.get("/rate/:image_id", getGalleryRating);
router.get("/:id", showGallery);

export default router;
