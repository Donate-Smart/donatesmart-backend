
import express from "express";
import {
  getPendingCases,
  approveCase,
  deleteCase,
  getAllUsers,
  getAnalytics,
} from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/pending-cases", verifyToken, getPendingCases);
router.put("/approve-case/:id", verifyToken, approveCase);
router.delete("/delete-case/:id", verifyToken, deleteCase);
router.get("/users", verifyToken, getAllUsers);
router.get("/analytics", verifyToken, getAnalytics);

export default router;
