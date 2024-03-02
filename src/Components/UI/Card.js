import React from "react";
import { useTheme } from "./ThemeContex";

const Card = ({ title, children, className, style }) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`w-full h-96 max-w-md mx-auto my-3 p-6 rounded-md shadow-md text-center ${
        isDarkMode ? "bg-secondary text-smoke" : "bg-white text-grayLight"
      } ${className}`}
      style={style}
    >
      <h3
        className={`font-semibold text-lg my-8  ${
          isDarkMode ? "text-white" : "text-primary"
        }`}
      >
        {title}
      </h3>
      {children}
    </div>
  );
};

export default Card;
