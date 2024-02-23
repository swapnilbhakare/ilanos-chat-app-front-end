import React, { useState } from "react";
import StepPhone from "./AuthSteps/StepPhone";
import StepOtp from "./AuthSteps/StepOtp";
import { useNavigate } from "react-router-dom";

const steps = {
  1: StepPhone,
  2: StepOtp,
};

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];
  const navigate = useNavigate();

  const onNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const onBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };
  return <Step onNext={onNext} onBack={onBack} navigate={navigate} />;
};

export default Authenticate;
