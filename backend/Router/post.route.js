import express from "express";
import {
  addComment,
  AddLike,
  createPost,
  deleteUserPost,
  getAllPosts,
  userpost,
} from "../controller/post.controller.js";
import { protectAuth } from "../MiddleWare/ProtectAuth.js";
import multer from "multer";
// import path from "path";
import { deleteUser } from "../controller/user.controller.js";
const router = express.Router();

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
router.post("/create", upload.array("images", 5), protectAuth, createPost);
router.post("/:postId/like", protectAuth, AddLike);
router.post("/:postId/comment", protectAuth, addComment);
router.delete("/:id", protectAuth, deleteUserPost);
router.get("/my-posts", protectAuth, userpost);
router.get("/all", getAllPosts);
export default router;
