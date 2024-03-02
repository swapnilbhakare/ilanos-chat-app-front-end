import React from "react";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        text === "Next"
          ? "mt-1 flex items-center font-bold px-8 py-3 bg-blue text-white rounded-full shadow-md transition duration-300 hover:bg-blue-dark hover:text-white"
          : "mt-1 flex items-center"
      } ${className}
        
        `}
    >
      {text === "Next" && text}
      {text === "Next" ? (
        <IoArrowForwardOutline className="ml-2" />
      ) : (
        <IoArrowBackOutline className="ml-2" />
      )}
      {text !== "Next" && text}
    </button>
  );
};

export default Button;
