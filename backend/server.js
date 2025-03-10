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
  "http://localhost:5173",  // Development
  "https://interviewbuddy-frontend-sl4m.onrender.com",  // Production
  "https://interviewbuddy-5sql.onrender.com" // Backend
];

app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomsRouter);
app.use('/api/run', runRouter);
app.use('/api/codeSnippets', codeSnippetsRouter);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  }
});

setupEditorSocket(io); 

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));