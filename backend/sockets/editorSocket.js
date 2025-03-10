import { Server } from "socket.io";

const setupEditorSocket = (server) => {
  if (!server) {
    console.error("❌ Error: No server instance provided to setupEditorSocket!");
    return;
  }

  const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    socket.on("join-session", (sessionId) => {
      socket.join(sessionId);
      console.log(`User ${socket.id} joined session ${sessionId}`);
    });

    socket.on("code-change", ({ sessionId, code }) => {
      socket.to(sessionId).emit("code-update", code);
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};

export default setupEditorSocket;
