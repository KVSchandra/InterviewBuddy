import express from 'express';
import Room from '../models/Room.js';

const router = express.Router();


router.post('/create', async (req, res) => {
  const { roomId } = req.body;

  if (!roomId) {
    return res.status(400).json({ success: false, message: "Room ID is required." });
  }

  try {
    const existingRoom = await Room.findOne({ roomId });
    if (existingRoom) {
      return res.status(409).json({ success: false, message: "Room ID already exists." });
    }

    const newRoom = new Room({ roomId });
    await newRoom.save();
    res.status(201).json({ success: true, roomId });
  } catch (err) {
    console.error("Error creating room:", err);
    res.status(500).json({ success: false, message: "Failed to create room." });
  }
});


// Check if a room exists
router.get('/exists/:roomId', async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findOne({ roomId });
    if (room) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to check room existence.' });
  }
});

export default router;