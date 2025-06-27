import express from "express";
import { protectAuth } from "../MiddleWare/ProtectAuth.js";
import {
  addPaymentStripe,
  CreatePaymentStripe,
  getAllPaymentStripe,
  getPaymentStripe,
  getPaymentStripeById,
} from "../controller/paymentStripe.controller.js";
const router = express.Router();
router.post("/create-checkout-session", protectAuth, addPaymentStripe);
router.post("/checkout-success", protectAuth, CreatePaymentStripe);
router.get("/user-payment", protectAuth, getPaymentStripe);
router.get("/all-payment", protectAuth, getAllPaymentStripe);
router.get("/:id", protectAuth, getPaymentStripeById);
export default router;
