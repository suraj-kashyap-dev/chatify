import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messagesRoutes.js";
import cors from "cors";
import { Server } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.APP_MONGODB_URI).then(() => {
      console.log("connected to the database...");
    });
  } catch (error) {
    console.log(`Something went wrong ${error}`);
  }
};

connectToDb();

const staticPath = path.join(__dirname, 'public');

app.use('/public', express.static(staticPath));

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.APP_SERVER_PORT || 5000, () => {
  console.log(
    `Server is running on port ${process.env.APP_SERVER_URL}:${process.env.APP_SERVER_PORT}`
  );
});

const io = new Server(server, {
  cors: {
    origin: process.env.APP_PUBLIC_URL,
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (user) => {
    onlineUsers.set(user._id, {
      socketId: socket.id,
      status: "online",
    });

    io.emit("user-status-change", { userId: user._id, status: "online" });
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    if (sendUserSocket) {
      socket.to(sendUserSocket.socketId).emit("msg-receive", data.msg);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers.forEach((value, key) => {
      if (value.socketId === socket.id) {
        onlineUsers.delete(key);

        io.emit("user-status-change", { userId: key, status: "offline" });
      }
    });
  });
});
