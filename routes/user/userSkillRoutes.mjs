import express from "express";
import { getUserSkill, postUserSkill, updateUserSkill, deleteUserSkill } from "../../controllers/user/userSkillController.mjs";

const router = express.Router();

router.get("/", getUserSkill);

router.post("/", postUserSkill);

router.put("/:id", updateUserSkill);

router.delete("/:id", deleteUserSkill);

export default router;
