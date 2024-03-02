import React, { useState } from "react";
import Card from "../../Components/UI/Card";
import Button from "../../Components/UI/Button";
import Input from "../../Components/UI/Input";
import { useTheme } from "../../Components/UI/ThemeContex";
import { useDispatch, useSelector } from "react-redux";
import { selectActivate, setName } from "../../store/activateSlice";
import { selectAuth } from "../../store/authSlice";

const StepName = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const activate = useSelector(selectActivate);
  const { user } = useSelector(selectAuth);
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState(user.fullName || activate.fullName);
  const { isDarkMode } = useTheme();

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setError(""); // Clear error message when full name changes
  };

  const handleSubmit = () => {
    try {
      if (!fullName) {
        setError("Please Enter Your Name");
        return;
      }
      dispatch(setName(fullName));
      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full md:justify-start sm:justify-start">
        <Card
          title="What’s your full name?"
          className="my-8 md:my-32 w-full max-w-md px-12"
        >
          <Input
            type="text"
            placeholder="Your Name"
            className={`my-4 ${
              isDarkMode ? "bg-primary text-smoke" : "bg-smoke text-primary"
            }`}
            value={fullName}
            onChange={handleFullNameChange}
          />
          <p
            className={`${
              isDarkMode ? "text-grayLight" : "text-grayDarker"
            } text-xs mt-5 md:mt-6`}
          >
            {error ? error : "We encourage you to use real names :)"}
          </p>
          <Button
            text="Next"
            className="mx-auto mt-6 md:mt-8"
            onClick={handleSubmit}
          />
        </Card>
      </div>
    </>
  );
};

export default StepName;
