import express from "express";
import {
  deleteMyAccount,
  deleteUser,
  login,
  logout,
  register,
  updateUser,
  userInfo,
} from "../controller/user.controller.js";
import { protectAuth } from "../MiddleWare/ProtectAuth.js";
const router = express.Router();
import upload from "../lib/multer.js";

router.post("/register", register);
router.post("/login", login);
router.post("/logout", protectAuth, logout);
router.delete("/delete-myaccount", protectAuth, deleteMyAccount);
router.delete("/delete-myaccount/:id", protectAuth, deleteUser);
router.put(
  "/update-myaccount",
  upload.single("avatar"),
  protectAuth,
  updateUser
);
router.get("/profile", protectAuth, userInfo);

export default router;
