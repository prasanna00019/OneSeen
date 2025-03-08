import express from "express";
import {
  CreatePost,
  DeletePost,
  EditPost,
  getAllPosts,
  GetPostById,
  getPostsOfAUser,
} from "../controllers/PostControllers.js";
const router = express.Router();
router.post("/create-post", CreatePost);
router.put("/edit-post/:postId", EditPost);
router.get("/get-posts", getAllPosts);
router.get("/get-post-by-id/:postId", GetPostById);
router.delete("/delete-post/:postId", DeletePost);
router.get("/get-post-of-a-user/:userId", getPostsOfAUser);
export default router;
