import express from "express";
import { getUserEducation, postUserEducation, updateUserEducation, deleteUserEducation } from "../../controllers/user/userEducationController.mjs";

const router = express.Router();

router.get("/", getUserEducation);

router.post("/", postUserEducation);

router.put("/:id", updateUserEducation);

router.delete("/:id", deleteUserEducation);

export default router;
