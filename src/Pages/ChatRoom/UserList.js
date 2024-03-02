import React, { useState } from "react";
import { useTheme } from "../../Components/UI/ThemeContex";

import { MdOutlineArrowBack } from "react-icons/md";

import Input from "../../Components/UI/Input";
import useSearch from "../../utils/useSearch";
import { CiMenuBurger } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import useChatRoom from "../../utils/useChatRoom";
import { IoSunny, IoMoonSharp } from "react-icons/io5";

const UserList = ({
  users,
  handleUserSelect,
  handleSelectFromSearch,
  className,
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { logoutUser } = useChatRoom();
  const {
    searchQuery,
    searchResult,
    showSearch,
    handleSearchInputChange,
    handleSearchSubmit,
    handleBackButtonClick,
    handleOpenSearch,
  } = useSearch(handleUserSelect);

  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(searchQuery);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`flex flex-col h-full ${className} ${
        isDarkMode
          ? "border-b-2 border-b-secondary"
          : "border-b-2 border-b-smoke"
      }`}
    >
      <div
        className={`flex justify-between items-center py-4 px-2  transition-all duration-300`}
      >
        {showSearch ? (
          <>
            <MdOutlineArrowBack
              className="cursor-pointer text-xl"
              onClick={() => handleBackButtonClick()}
            />

            <form onSubmit={handleSubmit} className="flex-grow mx-10">
              <Input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search Contact"
                className={`${
                  isDarkMode ? "bg-primary" : "bg-white"
                } text-sm rounded-3xl  `}
              />
            </form>
          </>
        ) : (
          <>
            <h4 className="text-xl font-bold">
              <CiMenuBurger onClick={handleToggleMenu} />
            </h4>
            <form onSubmit={handleSearch} className="w-3/4">
              <Input
                type="text"
                placeholder="search users..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className={`${
                  isDarkMode ? "bg-primary" : "bg-white"
                } text-sm rounded-3xl flex-grow`}
              />
            </form>
            <div>
              <IoChatboxEllipsesSharp
                className="cursor-pointer text-xl"
                onClick={handleOpenSearch}
              />
            </div>
          </>
        )}
      </div>

      {showMenu && (
        <div className="absolute top-20 w-32 left-0 p-2">
          <div
            className={`rounded-lg p-2 ${
              isDarkMode ? "glass-dark" : "glass-light"
            }`}
          >
            <div className="flex flex-col items-center justify-center">
              <button
                className="flex items-center justify-between mb-6"
                onClick={handleToggleMenu}
              >
                <FaUser className="font-bold text-xl mr-2" />
                <span>Profile</span>
              </button>
              <button
                onClick={toggleTheme}
                className="font-bold flex items-center justify-between mb-2"
              >
                {isDarkMode ? (
                  <>
                    <IoMoonSharp className="font-bold text-2xl mr-2" />
                    <span> Dark </span>
                  </>
                ) : (
                  <>
                    <IoSunny className="font-bold text-2xl mr-2" />
                    <span> Light </span>
                  </>
                )}
              </button>

              <button
                onClick={logoutUser}
                className="flex items-center justify-between mb-6"
              >
                <RiLogoutCircleRFill className="font-bold text-2xl mr-2" />{" "}
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {searchResult && (
        <div className={`flex flex-col p-2 `}>
          <div
            onClick={() => handleSelectFromSearch(searchResult)}
            className={`flex items-center py-2 ${
              isDarkMode
                ? "border-b-2 border-b-secondary"
                : "border-b-2 border-b-smoke"
            }`}
          >
            <img
              src={searchResult.avatar}
              className="w-10 h-10 rounded-full object-cover"
              alt="User Avatar"
            />
            <h6 className="name ml-2">{searchResult.fullName}</h6>
          </div>
        </div>
      )}
      {!showSearch && (
        <div className="overflow-y-auto">
          {Array.isArray(users) &&
            users.map((user) => (
              <div
                onClick={() => handleUserSelect(user)}
                className="user-card cursor-pointer flex items-center p-2"
                key={user.id}
              >
                <img
                  src={user.avatar}
                  className="w-10 h-10 rounded-full object-cover mr-2"
                  alt="User Avatar"
                />
                <h6 className="name">{user.fullName}</h6>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
