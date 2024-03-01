import ConversagtionScreen from "../components/ConversagtionScreen";
import Welcome from "../components/Welcome";
import Conversations from "../components/Conversations";
import { allUsersRoute, host } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from 'axios';
import React, { useEffect, useState, useRef } from "react";

function Home() {
  const navigate = useNavigate();

  const socket = useRef();

  const [contacts, setContacts] = useState([]);

  const [currentChat, setCurrentChat] = useState(undefined);

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("current-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("current-user")));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);

      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);

          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };

    fetchData();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <div className="flex">
        <Conversations
          contacts={contacts}
          changeChat={handleChatChange}
        ></Conversations>

        {!currentChat ? (
          <Welcome />
        ) : (
          <ConversagtionScreen currentChat={currentChat} socket={socket}></ConversagtionScreen>
        )}
      </div>
    </>
  );
}

export default Home;
