import crypto from "crypto";
import bcrypt from "bcrypt";
import database from "../config/database.mjs";
import sendEmail from "../utils/sendEmail.mjs"; // Fungsi untuk mengirim email (dibahas di bagian 4).

// 1. Kirim email reset password
export const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Cek apakah email ada di database
    const [user] = await database.query("SELECT * FROM account WHERE email = ?", [email]);
    if (user.length === 0) {
      return res.status(404).json({ message: "Email not found!" });
    }

    // Buat kode OTP
    const otp = crypto.randomInt(1000, 9999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // Berlaku 10 menit

    // Simpan OTP di database
    await database.query(
      "UPDATE account SET otp = ?, otp_expiry = ? WHERE email = ?",
      [otp, otpExpiry, email]
    );

    // Kirim email
    await sendEmail(email, "Reset Password", `Your OTP code is: ${otp}`);

    return res.status(200).json({ message: "OTP sent to your email!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// 2. Verifikasi OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const [user] = await database.query(
      "SELECT * FROM account WHERE email = ? AND otp = ? AND otp_expiry > NOW()",
      [email, otp]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid or expired OTP!" });
    }

    return res.status(200).json({ message: "OTP verified successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// 3. Reset Password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Perbarui password di database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await database.query(
      "UPDATE account SET password = ?, otp = NULL, otp_expiry = NULL WHERE email = ?",
      [hashedPassword, email]
    );

    return res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error!", error: error.message });
  }
};

