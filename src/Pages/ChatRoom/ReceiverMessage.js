import React from "react";
import { useTheme } from "../../Components/UI/ThemeContex";

const ReceiverMessage = ({ message, time, receiver }) => {
  const { isDarkMode } = useTheme();
  return (
    <div className="flex w-full mt-2 space-x-3 ">
      <img
        src={receiver?.avatar}
        alt="received"
        className="flex-shrink-0 h-10 w-10 rounded-full object-cover"
      />
      <div>
        <div
          className={`${
            isDarkMode ? "bg-primary text-smoke" : "bg-smoke text-primary"
          } p-3 rounded-r-lg rounded-bl-lg`}
        >
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs  leading-none">{time}</span>
      </div>
    </div>
  );
};

export default ReceiverMessage;
