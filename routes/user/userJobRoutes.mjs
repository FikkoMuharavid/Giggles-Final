import express from "express";
import { getAppliedJobs, applyJob } from "../../controllers/user/userJobController.mjs";

const router = express.Router();

router.get("/", getAppliedJobs);

router.post("/apply/:job_id", applyJob);

export default router;
