import BaseAvatar from "./BaesAvatar.jsx";
import BaseDrawer from "../Base/BaseDrawer.jsx";
import { useState } from "react";

const BaseMiniSidebar = ({ currentUser }) => {
  const [isSettingsDrawerOpen, setSettingsDrawerOpen] = useState(false);

  const [isProfileDrawerOpen, setProfileDrawerOpen] = useState(false);

  const toggleSettingsDrawer = () => {
    setSettingsDrawerOpen(!isSettingsDrawerOpen);
  };

  const toggleProfileDrawer = () => {
    setProfileDrawerOpen(!isProfileDrawerOpen);
  };

  return (
    <>
      <div className="flex p-2 shadow-lg select-none">
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-y-5 py-4 w-[50px] mx-auto">
            <img
              src="./home.png"
              className="bg-gray-300 p-1 h-7 w-7 rounded-full cursor-pointer"
              alt="Home"
              title="Home"
              tabIndex={0}
              onClick={toggleProfileDrawer}
            />
            <img
              src="./group.png"
              className="bg-gray-300 p-1 h-7 w-7 rounded-full cursor-pointer"
              alt="Group"
              title="Group"
              tabIndex={1}
            />
            <img
              src="./status.png"
              className="bg-gray-300 p-1 h-7 w-7 rounded-full cursor-pointer"
              alt="Status"
              title="Status"
              tabIndex={2}
            />
            <img
              src="./marketing.png"
              className="bg-gray-300 p-1 h-7 w-7 rounded-full cursor-pointer"
              alt="Marketing"
              title="Marketing"
              tabIndex={3}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-y-5 py-4 w-[50px] mx-auto">
            <img
              src="./settings.png"
              className="bg-gray-300 p-1 h-7 w-7 rounded-full cursor-pointer"
              alt="Settings"
              title="Settings"
              tabIndex={4}
              onClick={toggleSettingsDrawer}
            />
          </div>
        </div>
      </div>

      {/* Home Drawer */}
      <BaseDrawer
        isOpen={isProfileDrawerOpen}
        position="left"
        size="small"
        onClose={toggleProfileDrawer}
        title="Home"
      >
        {currentUser ? (
          <div className="max-w-screen-lg mx-auto p-5">
            <div className="flex flex-col items-center p-8  rounded-lg">
              <div className="w-[100px] h-[100px] bg-violet-500 rounded-full flex items-center justify-center text-white cursor-pointer">
                <BaseAvatar user={currentUser} showStatus={false}></BaseAvatar>
              </div>

              <h1 className="mt-4 text-xl font-semibold text-gray-800">
                {currentUser.name}
              </h1>

              <span className="mt-1 text-sm font-semibold text-gray-800">
                {currentUser.email}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </BaseDrawer>

      {/* Settings Drawer */}
      <BaseDrawer
        isOpen={isSettingsDrawerOpen}
        position="left"
        size="small"
        onClose={toggleSettingsDrawer}
        title="Settings"
      >
        Settings
      </BaseDrawer>
    </>
  );
};

export default BaseMiniSidebar;
