import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StepPhoneEmail from "../Components/AuthSteps/StepPhoneEmail";
import StepOtp from "../Components/AuthSteps/StepOtp";
import stepName from "../Components/AuthSteps/stepName";
import StepAvatar from "../Components/AuthSteps/StepAvatar";
import StepUsername from "../Components/AuthSteps/StepUsername";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
  3: stepName,
  4: StepAvatar,
  5: StepUsername,
};

const Authenticate = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const Step = steps[step];

  const onNext = () => {
    setStep(step + 1);
  };
  return (
    <>
      <Step onNext={onNext} />
    </>
  );
};

export default Authenticate;
