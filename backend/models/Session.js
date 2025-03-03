import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  title: String,
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  content: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("Session", sessionSchema);
