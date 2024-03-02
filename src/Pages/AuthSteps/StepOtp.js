import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import Input from "../../Components/UI/Input";
import { useTheme } from "../../Components/UI/ThemeContex";
import Card from "../../Components/UI/Card";
import Button from "../../Components/UI/Button";
import { verifyOtp } from "../../http/index";
import { selectAuth, setAuth } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Title = (
  <span className="flex justify-between flex-col items-center text-md">
    <FaLock className="text-2xl mb-1" />
    Please enter the OTP we just sent to your mobile number.
  </span>
);

const StepOtp = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const authData = useSelector(selectAuth);
  const [error, setError] = useState("");
  const { phone, hash } = authData.otp;
  const handleChange = (index, value) => {
    const newOtpDigits = [...otp];
    newOtpDigits[index] = value;
    setOtp(newOtpDigits);
  };

  const handleSubmit = async () => {
    try {
      const otpString = otp.join("");
      if (!otpString || otpString.length !== 4) {
        setError("Please Enter a Valid OTP");
        return;
      }
      if (!otp || !phone || !hash) {
        setError("Invalid OTP");
        return;
      }
      const { data } = await verifyOtp({ otp: otpString, phone, hash });
      const userData = data?.data;
      console.log(userData);
      dispatch(setAuth(userData));

      navigate("/activate");
      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center md:justify-start sm:justify-start">
        <Card title={Title} className=" px-12 w-full max-w-md">
          <div className="flex justify-center items-center space-x-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                placeholder="0"
                className={`text-center ${
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
            } text-xs `}
          >
            {error}
          </p>
          <p
            className={`${
              isDarkMode ? "text-grayLight" : "text-grayDarker"
            } text-md mt-4`}
          >
            Didn’t receive? <span className="text-blue ">Tap to resend</span>
          </p>
          <Button text="Next" className="mx-auto mt-4" onClick={handleSubmit} />
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
