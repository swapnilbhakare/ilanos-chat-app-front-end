import React from "react";
import { useTheme } from "./UI/ThemeContex";
import { IoSunny, IoMoonSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/authSlice";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const location = useLocation();
  const { user, isAuth } = useSelector(selectAuth);

  const shouldShowProfile = location.pathname === "/activate";

  return (
    <>
      <header className="flex justify-between items-center px-4 py-2 md:px-8 md:py-4 h-20 md:h-auto">
        <div className="flex items-center ml-2">
          {shouldShowProfile && isAuth && user.activated ? (
            <div className="cursor-pointer">
              {user && user.avatar && (
                <img
                  id="profile-image"
                  src={user.avatar}
                  className="w-10 h-10 rounded-full object-cover"
                  alt={user.fullName}
                />
              )}
            </div>
          ) : (
            <h1 className="text-lg md:text-xl font-semibold mr-4">ilanoS</h1>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <button onClick={toggleTheme} className="font-bold">
              {isDarkMode ? (
                <IoMoonSharp className="font-bold text-2xl" />
              ) : (
                <IoSunny className="font-bold text-2xl" />
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
