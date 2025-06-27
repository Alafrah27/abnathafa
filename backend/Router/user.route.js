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
import multer from "multer";
const storege = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Saving file to: public/uploads", file.originalname);
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname.trim().split(" ").join("-");
    const filename = `${Date.now()}-${originalName}`;
    console.log("Generated filename:", filename);
    cb(null, filename);
  },
});

const upload = multer({ storage: storege });

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
