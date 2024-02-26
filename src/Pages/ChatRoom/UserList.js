import React from "react";
import { useTheme } from "../../Components/UI/ThemeContex";

const UserList = ({ users, handleUserSelect, className }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`${
        isDarkMode ? "bg-secondary" : "bg-white"
      } w-96 transition-colors duration-300 shadow-md rounded-md mx-2 my-1 flex flex-grow flex-col p-6 overflow-y-auto ${className}`}
      style={{ maxHeight: "calc(100vh - 5rem)" }} // Adjust the maxHeight here
    >
      <h4 className="text-2xl font-bold">Chat</h4>
      {users.map((user) => (
        <div
          onClick={() => handleUserSelect(user)}
          className={`${
            isDarkMode ? "bg-primary" : "bg-smoke"
          } w-full flex items-center p-2 cursor-pointer my-1 rounded-md`}
          key={user.id}
        >
          <img
            src={user.avatar}
            className="w-12 h-12 rounded-full"
            alt="User Avatar"
          />
          <h6 className="ml-2">{user.fullName}</h6>
        </div>
      ))}
    </div>
  );
};

export default UserList;
