// filepath: backend_gruppenchat_alt/server.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // OK für die Entwicklung, sollte aber aus Sicherheitsgründen in der Produktion eingeschränkt werden
    methods: ["GET", "POST"],
  },
});
// „öffentlicher“ Ordner für statische Dateien (z. B. index.html)
app.use(express.static("public"));
// Anschluss
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("chat message", (msg) => {
    // Eingehende Nachricht an alle senden
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
//Portdefinition (von dotenv oder Standard)
const PORT = process.env.PORT || 3000;
// Server starten
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
