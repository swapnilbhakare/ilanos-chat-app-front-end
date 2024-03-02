import React, { useState } from "react";
import Input from "../../Components/UI/Input";
import { useTheme } from "../../Components/UI/ThemeContex";
import Card from "../../Components/UI/Card";
import Button from "../../Components/UI/Button";
import { sendOtp } from "../../http/index";
import { useDispatch } from "react-redux";
import { setOtp } from "../../store/authSlice";

const StepPhone = ({ onNext }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const { isDarkMode } = useTheme();

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setError(""); // Clear error message when phone number changes
  };

  const handleSubmit = async () => {
    try {
      if (!phone) {
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

  return (
    <div className="flex flex-col items-center justify-center md:justify-start sm:justify-start  h-full">
      <Card
        title="Enter your phone number"
        className={`w-full max-w-md px-14 ${
          isDarkMode ? "bg-secondary text-smoke" : "bg-white text-grayLight"
        }`}
      >
        <Input
          type="text"
          placeholder="+91 70300 01343"
          className={` ${
            isDarkMode ? "bg-primary text-smoke" : "bg-smoke text-primary"
          }`}
          value={phone}
          onChange={handlePhoneChange}
        />
        <p
          className={`${
            isDarkMode ? "text-grayLight" : "text-grayDarker"
          } text-xs my-5 m-auto`}
        >
          {error}
        </p>
        <Button text="Next" className="m-auto mt-8" onClick={handleSubmit} />
        <p
          className={`${
            isDarkMode ? "text-grayLight" : "text-grayDarker"
          } text-xs mt-6`}
        >
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </Card>
    </div>
  );
};

export default StepPhone;
