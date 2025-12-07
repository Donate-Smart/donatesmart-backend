import { checkout , webhook } from "../controllers/paymentController.js";
import express from "express";

const router = express.Router();

router.post("/checkout", checkout);

router.post("/webhook", express.raw({ type: "application/json" }), webhook);


export default router;
