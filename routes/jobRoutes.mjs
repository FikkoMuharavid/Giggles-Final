import express from "express";
import { getJobs, getLatestJobs, showJob } from "../controllers/jobController.mjs";

const router = express.Router();

router.get("/", getJobs);
router.get("/latest", getLatestJobs);
router.get("/:id", showJob);

export default router;
