import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import accountRoutes from "./routes/accountRoutes.mjs";
import loginUserRoutes from "./routes/loginUserRoutes.mjs";
import forgotPaswRoutes from "./routes/forgotPaswRoutes.mjs";
import notificationRoutes from "./routes/notificationRoutes.mjs";
import userPostCreationRoutes from "./routes/UserPostCreationRoutes.mjs";
import galleryRoutes from "./routes/galleryRoutes.mjs";
import jobRoutes from "./routes/jobRoutes.mjs";

import userProfileRoutes from "./routes/user/userProfileRoutes.mjs";
import userWorkRoutes from "./routes/user/userWorkRoutes.mjs";
import userEducationRoutes from "./routes/user/userEducationRoutes.mjs";
import userSkillRoutes from "./routes/user/userSkillRoutes.mjs";
import userGalleryRoutes from "./routes/user/userGalleryRoutes.mjs";
import userJobRoutes from "./routes/user/userJobRoutes.mjs";

import companyProfileRoutes from "./routes/company/companyProfileRoutes.mjs";
import companyJobRoutes from "./routes/company/companyJobRoutes.mjs";
import { authenticate, authorizeRole } from "./middlewares/authMiddleware.mjs";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => res.send("Hello World!"));

// Routes
app.use("/api/accounts", accountRoutes); // Semua endpoint account akan diakses melalui /api/accounts
app.use("/user", loginUserRoutes);

app.use("/api/forgot-password", forgotPaswRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/userpostcreation", userPostCreationRoutes); // Sesuaikan nama variabel

app.use("/api/gallery", galleryRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/notification", authenticate, notificationRoutes);

app.use("/api/user/profile", authenticate, userProfileRoutes);
app.use("/api/user/work", authenticate, userWorkRoutes);
app.use("/api/user/education", authenticate, userEducationRoutes);
app.use("/api/user/skill", authenticate, userSkillRoutes);
app.use("/api/user/gallery", authenticate, userGalleryRoutes);
app.use("/api/user/job", authenticate, userJobRoutes);

app.use("/api/company/profile", authenticate, authorizeRole("company"), companyProfileRoutes);
app.use("/api/company/job", authenticate, authorizeRole("company"), companyJobRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:${PORT}`);
});
