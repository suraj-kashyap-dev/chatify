import { useState } from "react";
import Screen from "../components/Screen";
import Welcome from "../components/Welcome";
import UserList from "../components/UserList";

function Home() {
  const [hasUser, setHasUser] = useState(null);

  const [users, setUsers] = useState([
    {
      name: "Suraj Kashyap",
      email: "suraj.kashyap370@webkul.in",
      profile_image:
        "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
      is_active: true,
      last_active: "11:14 PM",
    },
    {
      name: "Mayank Singh",
      email: "mayank.singh380@webkul.in",
      profile_image:
        "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      is_active: false,
      last_active: "10:44 PM",
    },
    {
      name: "Shivendra Gupta",
      email: "shivendra.gupta370@webkul.in",
      profile_image:
        "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
      is_active: true,
      last_active: "10:44 PM",
    },
  ]);

  return (
    <>
      <div className="flex">
        <UserList users={users} setHasUser={setHasUser}></UserList>

        {hasUser ? <Screen user={hasUser}></Screen> : <Welcome></Welcome>}
      </div>
    </>
  );
}

export default Home;
