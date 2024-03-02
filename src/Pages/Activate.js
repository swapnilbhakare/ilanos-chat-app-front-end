import React, { useState } from "react";
import StepName from "./AuthSteps/StepName";
import StepAvatar from "./AuthSteps/StepAvatar";
import { useNavigate } from "react-router-dom";

const steps = {
  1: StepName,
  2: StepAvatar,
};

const Activate = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const Step = steps[step];

  const onNext = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const onBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <>
      <Step onNext={onNext} onBack={onBack} navigate={navigate} />;
    </>
  );
};

export default Activate;
