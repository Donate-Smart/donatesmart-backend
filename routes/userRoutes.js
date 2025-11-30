import express from "express";
import { registerUser, loginUser, updateUser , getUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", verifyToken, updateUser);
router.get("/me", verifyToken, getUser);


export default router;
