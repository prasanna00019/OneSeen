import express from 'express';
import { CreatePost, DeletePost, downvotePost, EditPost,
getAllPosts, GetPostById, getPostsOfAUser, upvotePost } from '../controllers/PostControllers.js';
const router=express.Router();
router.post('/create-post',CreatePost);
router.put('/edit-post/:postId',EditPost);
router.get('/get-posts',getAllPosts);
router.get('/get-post-of-a-user/:userId',getPostsOfAUser);
router.get('/get-post-by-id/:postId',GetPostById);
router.delete('/delete-post/:postId',DeletePost);
router.put("/upvote/:postId", upvotePost);
router.put("/downvote/:postId", downvotePost);
export default router;