import express from 'express';
import { CreatePost, DeletePost, EditPost, getAllPosts, GetPostById } from '../controllers/PostControllers.js';
const router=express.Router();
router.post('/create-post',CreatePost);
router.put('/edit-post/:postId',EditPost);
router.get('/get-posts',getAllPosts);
router.get('/get-post-by-id/:postId',GetPostById);
router.delete('/delete-post/:postId',DeletePost);
export default router;