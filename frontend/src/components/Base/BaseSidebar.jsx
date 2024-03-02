import React, { useState } from "react";
import BaseSearchBar from "./BaseSearchBar";
import BaseAvatar from "./BaesAvatar";

function ConversationList({ contacts, changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);

    changeChat(contact);
  };

  return (
    <>
      <div className="select-none h-lvh p-1 w-1/4 min-w-[319px] max-w-[319px] bg-white border shadow-md sm:p-2 dark:bg-gray-800 dark:border-gray-700">
        <div className="relative p-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl">Chats</span>
            </div>
          </div>
        </div>
        <div className="flow-root">
          <BaseSearchBar></BaseSearchBar>
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
                  title={contact.name}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <BaseAvatar user={contact}></BaseAvatar>
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
