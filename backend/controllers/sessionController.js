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
