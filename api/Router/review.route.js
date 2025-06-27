import express from "express";
import { protectAuth } from "../MiddleWare/ProtectAuth.js";
import { addReview, getReviews } from "../controller/review.controoler.js";
const router = express.Router();

router.post("/add", protectAuth, addReview);
router.get("/all", getReviews);
export default router;
