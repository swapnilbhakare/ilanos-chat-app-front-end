import React, { useState } from "react";
import { useTheme } from "./UI/ThemeContex";
import { IoSunny, IoMoonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setAuth } from "../store/authSlice";
import { logout } from "../http";
import Profile from "../Pages/Profile";
const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user, isAuth } = useSelector(selectAuth);
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      const data = await logout();
      dispatch(setAuth(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <header className="flex justify-between items-center px-4 py-2 md:px-8 md:py-4 h-20 md:h-auto">
        <div className="flex items-center ml-2">
          {isAuth && user.activated ? (
            isAuth ? (
              <div onClick={handleGoToProfile} className="cursor-pointer">
                {user && user.avatar && (
                  <img
                    id="profile-image"
                    src={user.avatar}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={user.fullName}
                  />
                )}
              </div>
            ) : null
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

          {isAuth && (
            <button
              className="text-white cursor-pointer"
              onClick={logoutUser}
              text="logout"
            >
              logout
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
