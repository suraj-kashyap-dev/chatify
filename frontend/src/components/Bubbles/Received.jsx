import BaseAvatar from "../Base/BaesAvatar.jsx";
import dateTimeConverter from "../../helpers/dateTimeConverter.js";
import BaseDrawer from "../Base/BaseDrawer.jsx";
import { useState } from "react";
import TruncateText from "../Base/TruncateText.jsx";

function ReceivedBubble({ message, user }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="chat-message cursor-pointer">
        <div className="flex">
          <div className="flex flex-col space-y-2 text-md max-w-xs mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                <div className="flex items-center gap-1">
                  <TruncateText text={message.message} maxWords={50} />
                </div>
              </span>
            </div>
            <span className="text-xs">
              {dateTimeConverter(message.created_at)}
            </span>
          </div>

          <div className="flex items-end">
            <button onClick={toggleDrawer}>
              <BaseAvatar user={user} showStatus={false}></BaseAvatar>
            </button>
          </div>
        </div>
      </div>

      <BaseDrawer
        isOpen={isDrawerOpen}
        position="left"
        size="small"
        onClose={toggleDrawer}
        title={user.name}
      >
        {user ? (
          <div className="max-w-screen-lg mx-auto p-5">
            <div className="flex flex-col items-center p-8  rounded-lg">
              <div className="w-[100px] h-[100px] bg-violet-500 rounded-full flex items-center justify-center text-white cursor-pointer">
                <BaseAvatar user={user} showStatus={false}></BaseAvatar>
              </div>

              <h1 className="mt-4 text-xl font-semibold text-gray-800">
                {user.name}
              </h1>

              <span className="mt-1 text-sm font-semibold text-gray-800">
                {user.email}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </BaseDrawer>
    </>
  );
}

export default ReceivedBubble;
