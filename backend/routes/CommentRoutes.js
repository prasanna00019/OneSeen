import express from 'express';
import { AddComment, DeleteComment, EditCommentById, getAllCommentsOfAPost } from '../controllers/CommentControllers.js';
const router=express.Router();
router.post('/create-comment/:postId',AddComment);
router.delete('/delete-comment/:commentId/:postId',DeleteComment);
router.put('/edit-comment/:commentId/:postId',EditCommentById);
router.get('/get-comments/:postId',getAllCommentsOfAPost);
export default router;