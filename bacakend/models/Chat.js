import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    chatName: {
      type: String,
    },
    isGroupchat: {
      type: Boolean,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessaage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timeStamp: true,
  }
);

const Chat = mongoose.model("chat", chatSchema);

export default Chat;
