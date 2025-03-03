import { Server } from "socket.io";

const setupEditorSocket = (server) => {
<<<<<<< HEAD
  if (!server) {
    console.error("❌ Error: No server instance provided to setupEditorSocket!");
    return;
  }

=======
>>>>>>> 59da2ae (First Prototype Commit)
  const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
<<<<<<< HEAD
    console.log("✅ User connected:", socket.id);
=======
    console.log("User connected:", socket.id);
>>>>>>> 59da2ae (First Prototype Commit)

    socket.on("join-session", (sessionId) => {
      socket.join(sessionId);
      console.log(`User ${socket.id} joined session ${sessionId}`);
    });

    socket.on("code-change", ({ sessionId, code }) => {
      socket.to(sessionId).emit("code-update", code);
    });

    socket.on("disconnect", () => {
<<<<<<< HEAD
      console.log("❌ User disconnected:", socket.id);
=======
      console.log("User disconnected:", socket.id);
>>>>>>> 59da2ae (First Prototype Commit)
    });
  });
};

export default setupEditorSocket;
