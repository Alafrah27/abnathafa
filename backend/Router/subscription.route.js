import express from "express";
import { protectAuth } from "../MiddleWare/ProtectAuth.js";
import {
  AddSubscription,
  GetAllSubscriptions,
} from "../controller/Subscription.controller.js";
const router = express.Router();

router.post("/create", protectAuth, AddSubscription);
router.get("/all", GetAllSubscriptions);

export default router;
