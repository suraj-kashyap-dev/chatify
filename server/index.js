import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from './routes/messagesRoutes.js';
import cors from "cors";
import { Server } from "socket.io"; // Import Server from 'socket.io'

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
  }),
);

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("connected to the database...");
    });
  } catch (error) {
    console.log(`Something went wrong ${error}`);
  }
};

connectToDb();

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.APP_PORT || 5000, () => {
  console.log(
    `Server is running on port ${process.env.APP_URL}:${process.env.APP_PORT}`,
  );
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});
