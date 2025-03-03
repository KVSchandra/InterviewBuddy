import express from 'express';
import CodeSnippet from '../models/CodeSnippet.js';

const router = express.Router();

// Save a code snippet
router.post('/save', async (req, res) => {
  const { roomId, code, language } = req.body;
  try {
    const newSnippet = new CodeSnippet({ roomId, code, language });
    await newSnippet.save();
    res.status(201).json({ success: true, message: 'Code snippet saved successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save code snippet.' });
  }
});

// Load a code snippet
router.get('/load/:roomId', async (req, res) => {
  const { roomId } = req.params;
  try {
    const snippet = await CodeSnippet.findOne({ roomId }).sort({ createdAt: -1 });
    if (snippet) {
      res.status(200).json({ success: true, code: snippet.code, language: snippet.language });
    } else {
      res.status(404).json({ success: false, message: 'No code snippet found for this room.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load code snippet.' });
  }
});

export default router;