import React, { useState } from "react";

import { FaLock } from "react-icons/fa";
import Input from "../../Components/UI/Input";

import { useTheme } from "../../Components/UI/ThemeContex";
import Card from "../../Components/UI/Card";
import Button from "../../Components/UI/Button";
import { verifyOtp } from "../../http/index";
import { selectAuth, setAuth } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
const Title = (
  <span className="flex justify-between flex-col items-center text-md">
    <FaLock className="text-2xl mb-1" />
    Please enter the OTP we just sent to your mobile number.
  </span>
);

const StepOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const authData = useSelector(selectAuth);

  const { phone, hash } = authData.otp;
  const handleChange = (index, value) => {
    const newOtpDigits = [...otp];
    newOtpDigits[index] = value;
    setOtp(newOtpDigits);
  };

  const handleSubmit = async () => {
    try {
      const otpString = otp.join("");

      const { data } = await verifyOtp({ otp: otpString, phone, hash });
      const userData = data?.data;
      console.log(userData);
      dispatch(setAuth(userData));

      navigate("/activate");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card title={Title}>
        <div className="flex justify-center items-center space-x-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              maxLength={1}
              placeholder="0"
              classes={`text-center ${
                isDarkMode ? "bg-primary text-smoke" : "bg-smoke text-primary"
              }`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>
        <p
          className={`${
            isDarkMode ? "text-grayLight" : "text-grayDarker"
          } text-md mt-2`}
        >
          Didn’t receive? <span className="text-blue">Tap to resend</span>
        </p>
        <Button text="Next" onClick={handleSubmit} />
      </Card>
    </div>
  );
};

export default StepOtp;
