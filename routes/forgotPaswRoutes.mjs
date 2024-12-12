import express from "express";
import {
  sendResetPasswordEmail,
  verifyOTP,
  resetPassword,
} from "../controllers/forgotPaswController.mjs";

const router = express.Router();

// Endpoint untuk mengirim email reset password
router.post("/send-email", sendResetPasswordEmail);

// Endpoint untuk memverifikasi OTP
router.post("/verify-otp", verifyOTP);

// Endpoint untuk reset password
router.post("/reset-password", resetPassword);

export default router;
