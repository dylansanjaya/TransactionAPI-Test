import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

import { registerUser, loginUser, getProfile, updateProfile, updateProfileImage } from "../controllers/membership.controller.js";

const router = express.Router();

router.post("/registration", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile);
router.put("/profile/update", verifyToken, updateProfile);
router.put("/profile/image", verifyToken, upload.single("file"), updateProfileImage);

export default router;