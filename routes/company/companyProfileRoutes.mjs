import express from "express";
import { getCompanyProfile, updateCompanyProfile } from "../../controllers/company/companyProfileController.mjs";
import { upload, convertToWebP } from "../../middlewares/uploadMiddleware.mjs";

const router = express.Router();

router.get("/", getCompanyProfile);

router.put("/", upload, convertToWebP, updateCompanyProfile);

export default router;
