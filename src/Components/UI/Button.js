import React from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-1 flex items-center font-bold px-8 py-3 bg-blue text-white rounded-full shadow-md transition duration-300 hover:bg-blue-dark hover:text-white"
    >
      {text} <IoArrowForwardOutline className="ml-2" />
    </button>
  );
};

export default Button;
