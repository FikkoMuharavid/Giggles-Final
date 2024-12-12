import express from "express";
import { getUserProfile, updateUserProfile } from "../../controllers/user/userProfileController.mjs";
import { upload, convertToWebP } from "../../middlewares/uploadMiddleware.mjs";

const router = express.Router();

router.get("/", getUserProfile);

router.put("/", upload, convertToWebP, updateUserProfile);

export default router;
