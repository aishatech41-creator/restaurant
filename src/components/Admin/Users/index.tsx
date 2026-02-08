import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useStateValue } from "../../../context/StateProvider";
import User from "./user";


const Users = () => {
  const [{ users }, dispatch] = useStateValue();
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const filterUsers = () => {
    if (query.length === 0) {
      setFilteredUsers(users);
    } else {
      const filter = users.filter((item: any) => item.displayName.toLowerCase().includes(query.toLowerCase()));
      setFilteredUsers(filter);
    }
  }
  const searchUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    filterUsers();
  }
  return (
    <div className="w-full justify-center flex flex-col gap-4">
      {/* search bar */}
      <div className="w-full flex justify-center items-center p-2 bg-secondary/40 border border-white/5 backdrop-blur-md rounded-xl shadow-sm">
        <input
          className="w-full p-2 bg-transparent text-headingColor placeholder-gray-500 outline-none "
          type="text"
          placeholder="Search user..."
          value={query}
          onChange={(e) => searchUsers(e)}
        />
        {/* search button */}
        <button className="flex items-center justify-center p-2 text-lightGray hover:text-accent transition-colors duration-200">
          <FaSearch />
        </button>
      </div>

      {/* dasboard statistics and counts */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          filteredUsers.map((user: any) => (
            <User key={user.uid} item={user} />
          ))
        }
      </div>
    </div>
  );
};

export default Users;


