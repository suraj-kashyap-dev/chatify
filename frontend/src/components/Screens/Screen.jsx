import BaseToolbar from "../Base/BaseToolbar";
import ReceivedBubble from "../Bubbles/Received";
import Sendedbubble from "../Bubbles/Sended";
import BaseAvatar from "../Base/BaesAvatar";
import React, { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import axios from "axios";
import { recieveMessageRoute, sendMessageRoute } from "../../utils/api";
import BaseChatInput from "../Base/BaseChatInput";
import formatTimestamp from "../../helpers/dateTimeConverter";
import BaseDrawer from "../Base/BaseDrawer";
import Loader from "../../components/Base/BaseLoader";

function ConversagtionScreen({ currentChat, socket, setCurrentChat }) {
  const [messages, setMessages] = useState([]);

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [isMessagesLoading, isMessagesLoadingSet] = useState(true);

  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      isMessagesLoadingSet(true);

      try {
        const data = await JSON.parse(
          localStorage.getItem(import.meta.env.VITE_AUTH_USER)
        );

        const response = await axios.post(recieveMessageRoute, {
          from: data._id,
          to: currentChat._id,
        });

        setMessages(response.data);
      } finally {
        isMessagesLoadingSet(false);
      }
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
      localStorage.getItem(import.meta.env.VITE_AUTH_USER)
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
      {isMessagesLoading ? (
        <div className="flex items-center w-full justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex-1 sm:p-2 justify-between flex flex-col h-screen">
          <div className="flex sm:items-center justify-between px-1 border-b-2 border-gray-200">
            <div className="relative flex items-center space-x-4">
              <div className="flex items-center justify-center gap-4">
                <button title="Back" onClick={() => setCurrentChat(undefined)}>
                  <svg
                    className="h-7 w-7 cursor-pointer"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#000000"
                      d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    />
                    <path
                      fill="#000000"
                      d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    />
                  </svg>
                </button>
                <button onClick={toggleDrawer}>
                  <BaseAvatar user={currentChat}></BaseAvatar>
                </button>
              </div>
              <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                  <span className="text-gray-700 mr-3">{currentChat.name}</span>
                </div>
                <span className="text-lg text-gray-600">
                  {currentChat.email}
                </span>
              </div>
            </div>
            <BaseToolbar></BaseToolbar>
          </div>

          {/* Message Container */}
          <div
            id="messages"
            className="custom-scrollbar flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-violet scrollbar-thumb-rounded scrollbar-track-violet-lighter scrollbar-w-2 scrolling-touch"
          >
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={v4()}>
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

          <BaseChatInput handleSendMsg={handleSendMsg}></BaseChatInput>
        </div>
      )}

      <BaseDrawer
        isOpen={isDrawerOpen}
        position="left"
        size="small"
        onClose={toggleDrawer}
        title={currentChat.name}
      ></BaseDrawer>
    </>
  );
}

export default ConversagtionScreen;
