import { Server } from "socket.io";

const setupEditorSocket = (io) => {
  if (!io) {
    console.error("Error: No Socket.IO instance provided to setupEditorSocket!");
    return;
  }

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-session", (sessionId) => {
      if (!sessionId) return;
      socket.join(sessionId);
      console.log(`👥 User ${socket.id} joined session ${sessionId}`);
    });

    socket.on("code-change", ({ sessionId, code }) => {
      if (!sessionId || code === undefined) return;
      socket.to(sessionId).emit("code-update", code);
      console.log(`Code update in session ${sessionId} by ${socket.id}`);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export default setupEditorSocket;
