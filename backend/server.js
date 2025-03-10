import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import roomsRouter from './routes/roomRoutes.js';
import runRouter from './routes/run.js';
import codeSnippetsRouter from './routes/codeSnippets.js';
import setupEditorSocket from './sockets/editorSocket.js';
import connectToDB from './config/db.js';

dotenv.config();
connectToDB();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",  // Frontend in development
  "http://localhost:3000",  // Some React apps run on this
  "http://localhost:5000",  // API in development
  "https://interviewbuddy-frontend-sl4m.onrender.com",  // Production frontend
  "https://interviewbuddy-5sql.onrender.com",  // Backend hosted on Render
];

// ✅ Use CORS Middleware before routes
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// ✅ Handle Preflight Requests Globally
app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins.join(","));
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  return res.sendStatus(200);
});

// ✅ Define Routes after CORS
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomsRouter);
app.use('/api/run', runRouter);
app.use('/api/codeSnippets', codeSnippetsRouter);

// ✅ Socket.IO CORS Fix
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  }
});

setupEditorSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
