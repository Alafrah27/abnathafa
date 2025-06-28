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

// import { deleteUser } from "../controller/user.controller.js";
import upload from "../lib/multer.js";
const router = express.Router();

router.post("/create", upload.array("images", 5), protectAuth, createPost);
router.post("/:postId/like", protectAuth, AddLike);
router.post("/:postId/comment", protectAuth, addComment);
router.delete("/:id", protectAuth, deleteUserPost);
router.get("/my-posts", protectAuth, userpost);
router.get("/all", getAllPosts);
export default router;
