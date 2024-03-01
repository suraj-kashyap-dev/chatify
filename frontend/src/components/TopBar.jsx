import { useState, useEffect } from "react";
import Avatar from "./Avatar";
import Drawer from "./Drawer";
import Profile from "./Profile";
function TopBar() {
  const [currentUser, setCurrentUser] = useState({
    name: "Guest",
  });

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem("current-user");
        if (storedData) {
          setCurrentUser(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="relative p-2 bg-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <button onClick={toggleDrawer}>
              <Avatar user={currentUser}></Avatar>
            </button>

            <Drawer
              isOpen={isDrawerOpen}
              position="left"
              size="small"
              onClose={toggleDrawer}
              title="Profile"
            >
              <Profile currentUser={currentUser}></Profile>
            </Drawer>
          </div>
          <div>
            <div className="flex justify-between gap-4">
              <img
                src="./group.png"
                className="bg-gray-300 p-1 h-7 w-7 rounded-full cursor-pointer"
                alt="Group"
              />
              <img
                src="./status.png"
                className="bg-gray-300 p-1 h-7 w-7 rounded-full cursor-pointer"
                alt="Status"
              />
              <img
                src="./marketing.png"
                className="bg-gray-300 p-1 h-7 w-7 rounded-full cursor-pointer"
                alt="Marketing"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopBar;
