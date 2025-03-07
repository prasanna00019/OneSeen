import express from 'express';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
dotenv.config()
import path from "path";
import cors from 'cors'
import connectDB from './db/ConnectDB.js';
import { app, server } from './socket/socket.js';
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173","http://localhost:5174"], credentials: true }));
app.use(bodyParser.json());
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