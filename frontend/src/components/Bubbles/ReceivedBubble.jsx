import Avatar from "../Avatar";
import dateTimeConverter from "../../helpers/dateTimeConverter.js";
import Drawer from "../Drawer";
import { useState } from "react";

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
                  <span>{message.message}</span>
                </div>
              </span>
            </div>
            <span className="text-xs">
              {dateTimeConverter(message.created_at)}
            </span>
          </div>

          <div className="flex items-center">
            <button onClick={toggleDrawer}>
              <Avatar user={user}></Avatar>
            </button>
          </div>
        </div>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        position="right"
        size="small"
        onClose={toggleDrawer}
        title={user.name}
      ></Drawer>
    </>
  );
}

export default ReceivedBubble;
