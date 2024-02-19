import React from "react";
import { useTheme } from "./UI/ThemeContex";
import { IoSunny, IoMoonSharp } from "react-icons/io5";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center px-4 py-2 h-16">
      <div>
        <h1 className="text-lg md:text-xl font-semibold">ilanoS</h1>
      </div>
      <div>
        <button onClick={toggleTheme} className="font-bold">
          {" "}
          {isDarkMode ? (
            <IoMoonSharp className="font-bold text-lg" />
          ) : (
            <IoSunny className="font-bold text-lg" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
