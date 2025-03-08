import express from 'express';
import { createMessage, DeleteMessage, EditMessageById, 
GetMessagesBetweenTwoUsers, GetMesssageById } from '../controllers/MessageControllers.js';
const router=express.Router();
router.post('/create-message',createMessage);
router.put('/edit-message/:messageId',EditMessageById);
router.delete('/delete-message/:messageId',DeleteMessage);
router.get('/get-messages/:senderId/:receiverId',GetMessagesBetweenTwoUsers);
router.get('/get-message-by-id/:messageId',GetMesssageById);
export default router;