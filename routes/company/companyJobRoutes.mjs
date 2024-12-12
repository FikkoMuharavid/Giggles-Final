import express from "express";
import { getCompanyJobs, postCompanyJob, updateCompanyJob, deleteCompanyJob } from "../../controllers/company/companyJobController.mjs";
import { upload, convertToWebP } from "../../middlewares/uploadMiddleware.mjs";

const router = express.Router();

router.get("/", getCompanyJobs);

router.post("/", upload, convertToWebP, postCompanyJob);

router.put("/:id", upload, convertToWebP, updateCompanyJob);

router.delete("/:id", deleteCompanyJob);

export default router;
