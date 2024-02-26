import React from "react";
import Card from "./Card";
import { useTheme } from "./ThemeContex";

const Loader = ({ message }) => {
  const { isDarkMode } = useTheme();
  return (
    <Card className="justify-center">
      <div
        className={`${
          isDarkMode ? "border-grayDark" : "border-white"
        } h-10 w-10 animate-spin rounded-full border-4 border-t-indigo mb-4`}
      />
      <p>{message}</p>
    </Card>
  );
};

export default Loader;
