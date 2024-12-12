import express from "express";
import { createPost, getUserPosts, getAllPosts } from "../controllers/UserPostCreationRoutes.mjs";

const router = express.Router();

// Endpoint untuk membuat post baru
router.post("/", createPost);

// Endpoint untuk mendapatkan semua post user tertentu
router.get("/:userId", getUserPosts);

// Endpoint untuk mendapatkan semua post (opsional)
router.get("/", getAllPosts);

export default router;
