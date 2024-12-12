import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_SERVER_EMAIL, // Ganti dengan email Anda
    pass: process.env.MAIL_SERVER_PASSWORD, // Ganti dengan password email Anda
  },
});

console.log(process.env.MAIL_SERVER_EMAIL);
console.log(process.env.MAIL_SERVER_PASSWORD);

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"GIGGLE\'S Support" <your-email@gmail.com>',
      to,
      subject,
      text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Email failed to send");
  }
};

export default sendEmail;
