import Screen from "./components/Screens/Screen";
import Welcome from "./components/Screens/Welcome";
import BaseSideBar from "./components/Base/BaseSidebar";
import { usersRoute, host, updateStatus } from "./utils/api";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import BaseMiniSidebar from "./components/Base/BaseMiniSidebar";

function App() {
  const navigate = useNavigate();

  const socket = useRef();

  const [contacts, setContacts] = useState([]);

  const [currentChat, setCurrentChat] = useState(undefined);

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem(import.meta.env.VITE_AUTH_USER)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(localStorage.getItem(import.meta.env.VITE_AUTH_USER))
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);

      socket.current.emit("add-user", currentUser);

      socket.current.on("user-status-change", (user) => {
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact._id === user.userId
              ? { ...contact, status: user.status }
              : contact
          )
        );

        const updateActiveStatus = async (user) => {
          if (currentUser) {
            await axios.post(`${updateStatus}/${user.userId}`, {
              status: user.status
            });
          }
        };

        updateActiveStatus(user);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const data = await axios.get(`${usersRoute}/${currentUser._id}`);

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
        <div className="flex">
          <BaseMiniSidebar currentUser={currentUser}></BaseMiniSidebar>

          <BaseSideBar
            contacts={contacts}
            changeChat={handleChatChange}
            currentUser={currentUser}
          ></BaseSideBar>
        </div>

        {!currentChat ? (
          <Welcome />
        ) : (
          <Screen
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            socket={socket}
          ></Screen>
        )}
      </div>
    </>
  );
}

export default App;
