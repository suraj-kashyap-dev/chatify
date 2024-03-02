import React, { useEffect, useState, useRef } from "react";
import SearchBar from "./BaseSearchBar";
import Avatar from "./BaesAvatar";
import TopBar from "./BaseTopBar";

function ConversationList({ contacts, changeChat }) {
  const [currentname, setCurrentname] = useState(undefined);

  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem(import.meta.env.VITE_AUTH_USER);

      if (storedData) {
        const data = JSON.parse(storedData);
        setCurrentname(data.name);
        setCurrentUserImage(data.avatarImage);
      }
    };

    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);

    changeChat(contact);
  };

  return (
    <>
      <div className="select-none h-lvh p-1 w-1/4 bg-white border shadow-md sm:p-2 dark:bg-gray-800 dark:border-gray-700">
        <TopBar></TopBar>
        <div className="flow-root">
          <SearchBar></SearchBar>
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {contacts.map((contact, index) => {
              return (
                <li
                  key={contact.email}
                  onClick={() => changeCurrentChat(index, contact)}
                  className={`py-3 sm:py-4 cursor-pointer ${index == currentSelected ? "bg-gray-100" : ""} hover:bg-gray-100 p-2`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <Avatar user={contact}></Avatar>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {contact.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {contact.email}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-sm text-gray-900 dark:text-white">
                      {contact.last_active}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ConversationList;
