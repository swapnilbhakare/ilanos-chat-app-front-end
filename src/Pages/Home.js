import React from "react";
import { useTheme } from "../Components/UI/ThemeContex";

import Card from "../Components/UI/Card";
import Button from "../Components/UI/Button";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const startRegister = () => {
    navigate("/authenticate");
  };

  return (
    <Card title="👋 Welcome to ilanoS! 🤩">
      <p
        className={`text-center px-4  transition-colors duration-200 ${
          isDarkMode ? " text-grayLight" : " text-grayDarker"
        }`}
      >
        We're thrilled to have you here. Explore our amazing features and
        discover new possibilities!
      </p>
      <Button onClick={startRegister} text=" Let's get start" />
      <span className="text-blue">Have an invite text? Sign in</span>
    </Card>
  );
};

export default Home;
