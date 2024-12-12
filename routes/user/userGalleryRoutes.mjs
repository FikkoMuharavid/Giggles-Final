import express from "express";
import { getUserGalleries, postUserGallery, updateUserGallery, deleteUserGallery, postRateGallery, getUserCollectionGallery, postAddCollectionGallery, getRatedGallery } from "../../controllers/user/userGalleryController.mjs";
import { upload, convertToWebP } from "../../middlewares/uploadMiddleware.mjs";

const router = express.Router();

router.get("/", getUserGalleries);

router.post("/", upload, convertToWebP, postUserGallery);

router.get("/star", getRatedGallery);

router.post("/rate/:image_id", postRateGallery);

router.get("/collection", getUserCollectionGallery);

router.post("/collection/:image_id", postAddCollectionGallery);

router.put("/:id", upload, convertToWebP, updateUserGallery);

router.delete("/:id", deleteUserGallery);

export default router;
