import express from 'express';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
dotenv.config()
import path from "path";
import { checkForPostExpiration } from './utils/SERVICE-WORKERS.js';
import cors from 'cors'
import connectDB from './db/ConnectDB.js';
import { app, server } from './socket/socket.js';
import PostRoutes from './routes/PostRoutes.js';
import MessageRoutes from './routes/MessageRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';
import CommentRoutes from './routes/CommentRoutes.js';
// checkForPostExpiration();
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["https://oneseen.onrender.com","http://localhost:5173"], credentials: true }));
app.use(bodyParser.json());
app.use('/api/posts',PostRoutes);
app.use('/api/messages',MessageRoutes);
app.use('/api/auth',AuthRoutes);
app.use('/api/comments',CommentRoutes);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(path.resolve(), "frontend/dist")));
    app.get('*', (req, res) => {
      res.sendFile(path.join(path.resolve(), "frontend/dist", "index.html"));
    });
  }
  server.listen(PORT, () => {
    console.log(`hello ${PORT}`);
    connectDB();
  })