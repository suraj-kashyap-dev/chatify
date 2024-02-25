import { useState } from "react";
import Screen from "../components/Screen";
import Welcome from "../components/Welcome";

function Home() {
  const [hasUser, setHasUser] = useState(null);

  const [users, setUsers] = useState([
    {
      name: "Suraj Kashyap",
      email: "suraj.kashyap370@webkul.in",
      profile_image:
        "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
      is_active: true,
    },
    {
      name: "Mayank Singh",
      email: "mayank.singh380@webkul.in",
      profile_image:
        "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      is_active: false,
    },
    {
      name: "Shivendra Gupta",
      email: "shivendra.gupta370@webkul.in",
      profile_image:
        "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
      is_active: true,
    },
  ]);

  return (
    <>
      <div className="flex">
        <div className="h-lvh p-1 max-w-md bg-white border shadow-md sm:p-2 dark:bg-gray-800 dark:border-gray-700">
          <div className="relative p-2 bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
              alt="Suraj Kashyap"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flow-root">
            <form className="max-w-md mx-auto m-2">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 "
                  placeholder="Search Mockups, Logos..."
                />
              </div>
            </form>

            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {users.map((user) => {
                return (
                  <li
                    onClick={() => setHasUser(user)}
                    className="py-3 sm:py-4 cursor-pointer hover:bg-gray-100 p-2"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          {user.is_active ? (
                            <span className="absolute text-green-500 right-0 bottom-0">
                              <svg width={10} height={10}>
                                <circle
                                  cx={4}
                                  cy={4}
                                  r={4}
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          ) : (
                            ""
                          )}
                          <img
                            src={user.profile_image}
                            alt={user.name}
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                      <div class="inline-flex items-center text-sm text-gray-900 dark:text-white">
                        10:02 PM
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {hasUser ? <Screen user={hasUser}></Screen> : <Welcome></Welcome>}
      </div>
    </>
  );
}

export default Home;
