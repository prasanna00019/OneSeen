import express from 'express';
import { checkUsername, register } from '../controllers/AuthControllers.js';
const router=express.Router();
router.post('/register',register);
router.post('/login');
router.post('/logout');
router.get('/check-username/:username',checkUsername);
export default router;