import React, { useState } from "react";
import Input from "../UI/Input";
import { MdLocalPhone, MdOutlineEmail } from "react-icons/md";
import { useTheme } from "../UI/ThemeContex";
import Card from "../UI/Card";
import Button from "../UI/Button";

const StepPhoneEmail = () => {
  const [activeInput, setActiveInput] = useState("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { isDarkMode } = useTheme();

  const handlePhoneClick = () => {
    setActiveInput("phone");
  };

  const handleEmailClick = () => {
    setActiveInput("email");
  };

  const formatPhoneNumber = (value) => {
    const numericValue = value.replace(/\D/g, "");

    return numericValue.replace(/(\d{5})(\d{5})/, "$1 $2");
  };

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhone(formattedValue);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  console.log(email);

  const Title = (
    <>
      <span className="flex items-center">
        {activeInput === "phone" && <MdLocalPhone className="mr-1 text-2xl" />}
        {activeInput === "phone" && "Enter your phone number"}
        {activeInput === "email" && (
          <MdOutlineEmail className="mr-1 text-2xl" />
        )}
        {activeInput === "email" && "Enter your email id"}
      </span>
    </>
  );

  return (
    <div className="flex flex-col items-center justify-center mx-auto w-full max-w-md px-4">
      <div className="flex justify-center mb-1">
        <MdLocalPhone
          onClick={handlePhoneClick}
          className={`text-5xl p-1 mr-2 rounded-md transition-colors ${
            activeInput === "phone"
              ? isDarkMode
                ? "bg-blue text-white"
                : "bg-blue text-white"
              : isDarkMode
              ? "bg-secondary text-smoke"
              : "bg-white text-primary"
          }`}
        />
        <MdOutlineEmail
          onClick={handleEmailClick}
          className={`text-5xl p-1 mr-2 rounded-md transition-colors ${
            activeInput === "email"
              ? isDarkMode
                ? "bg-blue text-white"
                : "bg-blue text-white"
              : isDarkMode
              ? "bg-secondary text-smoke"
              : "bg-white text-primary"
          }`}
        />
      </div>
      <Card className="w-full" title={Title}>
        {activeInput === "phone" && (
          <Input
            type="text"
            placeholder="+91 70300 01343"
            classes={`${
              isDarkMode ? "bg-primary text-smoke" : "bg-smoke text-primary"
            }`}
            value={phone}
            onChange={handlePhoneChange}
          />
        )}
        {activeInput === "email" && (
          <Input
            type="email"
            placeholder="swapnilbhakare7@gmail.com"
            classes={`${
              isDarkMode ? "bg-primary text-smoke" : "bg-smoke text-primary"
            }`}
            value={email}
            onChange={handleEmailChange}
          />
        )}

        <Button text="Next" />
        <p
          className={`${
            isDarkMode ? "text-grayLight" : "text-grayDarker"
          } text-xs mt-2`}
        >
          By entering your number/Email, you’re agreeing to our Terms of Service
          and Privacy Policy. Thanks!
        </p>
      </Card>
    </div>
  );
};

export default StepPhoneEmail;
