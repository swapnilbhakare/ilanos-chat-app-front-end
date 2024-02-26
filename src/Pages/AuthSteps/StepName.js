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

  const handlefullNameChange = (e) => {
    setFullName(e.target.value);
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
      <Button text="Back" onClick={onBack} />

      <Card title="What’s your full name?" className="my-6">
        <Input
          type="text"
          placeholder="Your Name"
          className={`${
            isDarkMode ? "bg-primary text-smoke" : "bg-smoke text-primary"
          }`}
          value={fullName}
          onChange={handlefullNameChange}
        />
        <p
          className={`${
            isDarkMode ? "text-grayLight" : "text-grayDarker"
          } text-xs mt-2`}
        >
          {error ? error : "We encourage you to use real names :)"}
        </p>

        <Button text="Next" onClick={handleSubmit} />
      </Card>
    </>
  );
};

export default StepName;
