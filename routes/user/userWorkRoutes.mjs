import express from "express";
import { getUserWork, postUserWork, updateUserWork, deleteUserWork } from "../../controllers/user/userWorkController.mjs";

const router = express.Router();

router.get("/", getUserWork);

router.post("/", postUserWork);

router.put("/:id", updateUserWork);

router.delete("/:id", deleteUserWork);

export default router;
