import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ message: "Run endpoint is working!" });
});

export default router;
