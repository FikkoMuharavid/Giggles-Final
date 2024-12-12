import express from "express";
import { getAboutUs, updateAboutUs } from "../controllers/aboutUsController.mjs";

const router = express.Router();

// Endpoint untuk mendapatkan informasi About Us
router.get("/:companyId", getAboutUs);

// Endpoint untuk memperbarui informasi About Us
router.put("/:companyId", updateAboutUs);

export default router;
