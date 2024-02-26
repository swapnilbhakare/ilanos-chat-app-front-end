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
    <Card
      title="👋 Welcome to ilanoS! 🤩"
      className={`mb-4 ${
        isDarkMode ? "bg-secondary text-smoke" : "bg-white text-grayLight"
      }`}
    >
      <p
        className={`text-center px-4 py-2 text-sm ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        We're thrilled to have you here. Explore our amazing features and
        discover new possibilities!
      </p>
      <div className="flex justify-center mt-4">
        <Button onClick={startRegister} text="Next">
          Let's Get Started
        </Button>
      </div>
      <p className="text-center mt-2 text-blue-500">
        Have an invite text? Sign in
      </p>
    </Card>
  );
};

export default Home;
