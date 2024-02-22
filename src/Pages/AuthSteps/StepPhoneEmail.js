import React, { useState } from "react";
import Input from "../../Components/UI/Input";
import { MdLocalPhone, MdOutlineEmail } from "react-icons/md";
import { useTheme } from "../../Components/UI/ThemeContex";
import Card from "../../Components/UI/Card";
import Button from "../../Components/UI/Button";
import { sendOtp } from "../../http/index";
import { useDispatch } from "react-redux";
import { setOtp } from "../../store/authSlice";
import { useNavigate } from "react-router-dom/dist";

const StepPhoneEmail = ({ onNext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeInput, setActiveInput] = useState("phone");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { isDarkMode } = useTheme();

  const handlePhoneClick = () => {
    setActiveInput("phone");
  };

  const handleEmailClick = () => {
    setActiveInput("email");
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      if (activeInput === "phone" && !phone) {
        setError("Please enter your phone number.");
        return;
      }
      if (activeInput === "email" && !email) {
        setError("Please enter your phone number.");
        return;
      }
      const { data } = await sendOtp({ phone });
      console.log(data);
      dispatch(setOtp({ phone: data?.data?.phone, hash: data?.data?.hash }));
      onNext();
    } catch (error) {
      console.log(error);
    }
  };

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
        <p
          className={`${
            isDarkMode ? "text-grayLight" : "text-grayDarker"
          } text-xs mt-2`}
        >
          {error}
        </p>
        <Button text="Next" onClick={handleSubmit} />

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
