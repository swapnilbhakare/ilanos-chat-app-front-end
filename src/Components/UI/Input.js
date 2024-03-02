import React from "react";

const Input = (props) => {
  return (
    <input
      {...props}
      className={`  w-full px-5 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg ${props.className}`}
    />
  );
};

export default Input;
