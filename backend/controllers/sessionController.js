<<<<<<< HEAD
import Session from '../models/Session.js';
import User from '../models/User.js';

export const createSession = async (req, res) => {
  const { userId, roomId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newSession = new Session({ userId, roomId });
    await newSession.save();

    res.status(201).json({ success: true, session: newSession });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create session' });
  }
};

export const getSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve session' });
  }
};

export const deleteSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    await session.remove();
    res.status(200).json({ success: true, message: 'Session deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete session' });
  }
};
=======
import Session from "../models/Session.js";

export const createSession = async (req, res) => {
  try {
    const { title } = req.body;
    const session = new Session({ title, host: req.user, users: [req.user] });
    await session.save();
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: "Error creating session" });
  }
};

export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("host", "username");
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sessions" });
  }
};
>>>>>>> 59da2ae (First Prototype Commit)
