import ConversagtionScreen from "../components/Screens/ConversagtionScreen";
import Welcome from "../components/Screens/Welcome";
import ConversationList from "../components/ConversationList";
import { allUsersRoute, host } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
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
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);

        setContacts(data.data);
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
        <ConversationList
          contacts={contacts}
          changeChat={handleChatChange}
        ></ConversationList>

        {!currentChat ? (
          <Welcome />
        ) : (
          <ConversagtionScreen
            currentChat={currentChat}
            socket={socket}
          ></ConversagtionScreen>
        )}
      </div>
    </>
  );
}

export default Home;
