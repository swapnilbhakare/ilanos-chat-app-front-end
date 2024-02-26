import React from "react";
import { useTheme } from "../../Components/UI/ThemeContex";

const SenderMessage = ({ message, time }) => {
  const { isDarkMode } = useTheme();
  return (
    <div className="flex w-full mt-2 mr-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div
          className={`${
            isDarkMode ? "bg-primary text-white" : " text-primary bg-smoke"
          } p-3 rounded-l-lg rounded-br-lg`}
        >
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs leading-none">{time}</span>
      </div>
      <img
        src="./images/avatar-default.jpeg"
        alt="sender"
        className="flex-shrink-0 h-10 w-10 rounded-full"
      />
    </div>
  );
};

export default SenderMessage;
