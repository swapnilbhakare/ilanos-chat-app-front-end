import React from "react";
import { useTheme } from "./UI/ThemeContex";
import { IoSunny, IoMoonSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setAuth } from "../store/authSlice";
import { logout } from "../http";
import Button from "./UI/Button";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
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

  return (
    <header className="flex justify-between items-center px-4 py-2 md:px-8 md:py-4 h-20 md:h-auto">
      {" "}
      {/* Changed height to h-20 for the header */}
      <div className="flex items-center">
        <h1 className="text-lg md:text-xl font-semibold mr-4">ilanoS</h1>
        {user && (
          <img
            src={user.avatar}
            className="w-10 h-10 rounded-full"
            alt={user.fullName}
          />
        )}
      </div>
      <div>
        <button onClick={toggleTheme} className="font-bold">
          {isDarkMode ? (
            <IoMoonSharp className="font-bold text-2xl" />
          ) : (
            <IoSunny className="font-bold text-2xl" />
          )}
        </button>
        {/* <Button onClick={logoutUser} text="logout"></Button> */}
      </div>
    </header>
  );
};

export default Header;
