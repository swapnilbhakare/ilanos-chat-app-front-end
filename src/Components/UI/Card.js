import React from "react";

import { useTheme } from "./ThemeContex";

const Card = ({ title, children, className, style }) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={` w-96 h-full transition-colors duration-300 shadow-md rounded-md mx-auto my-8 flex flex-col p-6 justify-evenly items-center text-center  ${
        isDarkMode ? "bg-secondary text-smoke" : "bg-white text-grayLight"
      }  ${className}`}
      style={style ? style : { maxHeight: "75vh" }}
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
