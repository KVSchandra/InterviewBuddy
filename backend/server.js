import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import roomsRouter from './routes/roomRoutes.js';
import runRouter from './routes/run.js';
import codeSnippetsRouter from './routes/codeSnippets.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomsRouter);
app.use('/api/run', runRouter);
app.use('/api/codeSnippets', codeSnippetsRouter);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join-room', (roomId) => {
    if (!roomId) {
      console.error(`User ${socket.id} tried to join without a roomId!`);
      return;
    }

    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on('code-change', ({ roomId, code }) => {
    if (!roomId) {
      console.error(`User ${socket.id} tried to send changes without a roomId!`);
      return;
    }
    socket.to(roomId).emit('receive-changes', code);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  server.listen(5000, () => console.log('Server running on port 5000'));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});