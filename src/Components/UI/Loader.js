import React from "react";
import Card from "./Card";
import { useTheme } from "./ThemeContex";

const Loader = ({ message }) => {
  const { isDarkMode } = useTheme();
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <Card className="flex justify-center">
        <div className="flex flex-col justify-center items-center">
          <div
            className={`h-10 w-10 animate-spin rounded-full border-4 border-t-indigo ${
              isDarkMode ? "border-grayDark" : "border-white"
            } mb-4`}
          />
          <p
            className={`${
              isDarkMode ? "bg-secondary text-white" : "bg-white text-primary"
            } mt-4`}
          >
            {message}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Loader;
