import React, { useState } from "react";

function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();

    if (msg.length > 0) {
      handleSendMsg(msg);

      setMsg("");
    }
  };

  return (
    <>
      <form onSubmit={(event) => sendChat(event)}>
        <div className="border-t-2 border-gray-200 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Write your message!"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-200 rounded-md py-3"
            />
            {msg.length ? (
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full ml-2 px-2 py-2 transition duration-500 ease-out text-white bg-violet-500 hover:bg-violet-400 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full ml-2 px-3 py-3 transition duration-500 ease-out text-black hover:bg-violet-400 focus:outline-none"
              >
                <svg
                  fill="currentColor"
                  className="h-6 w-6"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <g>
                      <path d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z" />
                      <path d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z" />
                    </g>
                  </g>
                </svg>
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default ChatInput;
