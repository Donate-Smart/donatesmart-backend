import express from "express";
import { registerUser, loginUser, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", verifyToken, updateUser);

export default router;
