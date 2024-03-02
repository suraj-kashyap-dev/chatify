import Toolbar from "../Base/BaseToolbar";
import ReceivedBubble from "../Bubbles/Received";
import Sendedbubble from "../Bubbles/Sended";
import Avatar from "../Base/BaesAvatar";
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { recieveMessageRoute, sendMessageRoute } from "../../utils/api";
import ChatInput from "../Base/BaseChatInput";
import formatTimestamp from "../../helpers/dateTimeConverter";
import Drawer from "../Base/BaseDrawer";

function ConversagtionScreen({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);

  const scrollRef = useRef();

  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(import.meta.env.VITE_AUTH_USER),
      );

      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });

      setMessages(response.data);
    };

    fetchData();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem(import.meta.env.VITE_AUTH_USER))
          ._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(import.meta.env.VITE_AUTH_USER),
    );

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      created_at: formatTimestamp,
      msg,
    });

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];

    msgs.push({
      fromSelf: true,
      message: msg,
    });

    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="flex-1 sm:p-2 justify-between flex flex-col h-screen">
        <div className="flex sm:items-center justify-between px-1 border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4">
            <div className="relative">
               <button onClick={toggleDrawer}>
                  <Avatar user={currentChat}></Avatar>
               </button>
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-700 mr-3">{currentChat.name}</span>
              </div>
              <span className="text-lg text-gray-600">{currentChat.email}</span>
            </div>
          </div>
          <Toolbar></Toolbar>
        </div>

        {/* Message Container */}
        <div
          id="messages"
          className="custom-scrollbar flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-violet scrollbar-thumb-rounded scrollbar-track-violet-lighter scrollbar-w-2 scrolling-touch"
        >
          {messages.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                {message.fromSelf ? (
                  <Sendedbubble message={message}></Sendedbubble>
                ) : (
                  <ReceivedBubble
                    message={message}
                    user={currentChat}
                  ></ReceivedBubble>
                )}
              </div>
            );
          })}
        </div>

        <ChatInput handleSendMsg={handleSendMsg}></ChatInput>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        position="left"
        size="small"
        onClose={toggleDrawer}
        title="Suraj KAshayp"
      ></Drawer>
    </>
  );
}

export default ConversagtionScreen;
