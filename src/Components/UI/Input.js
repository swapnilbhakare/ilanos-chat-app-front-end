import React from "react";

const Input = (props) => {
  return (
    <div className="relative">
      <input
        {...props}
        className={`block w-full px-5 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg ${props.classes}`}
      />
    </div>
  );
};

export default Input;
