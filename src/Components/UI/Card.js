import React, { Children } from "react";

import { useTheme } from "./ThemeContex";

const Card = ({ title, children, className }) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`${className} w-96 h-96 transition-colors duration-300 shadow-md rounded-md mx-auto my-12 flex flex-col p-6 justify-evenly items-center text-center  ${
        isDarkMode ? "bg-secondary text-smoke" : "bg-white text-grayLight"
      }`}
    >
      <h3
        className={`transition-colors duration-200 font-semibold text-lg ${
          isDarkMode ? " text-white" : " text-primary"
        }
        }`}
      >
        {title}
      </h3>
      {children}
    </div>
  );
};

export default Card;
