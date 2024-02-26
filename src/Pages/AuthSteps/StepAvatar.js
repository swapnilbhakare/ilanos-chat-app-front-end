import React, { useState } from "react";
import Card from "../../Components/UI/Card";
import Button from "../../Components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectActivate } from "../../store/activateSlice";
import { useNavigate } from "react-router-dom/dist";
import { setAvatar } from "../../store/activateSlice";
import { activate } from "../../http";
import { setAuth } from "../../store/authSlice";
import { selectAuth } from "../../store/authSlice";
import Loader from "../../Components/UI/Loader";
import { useTheme } from "../../Components/UI/ThemeContex";
const StepAvatar = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const [loading, SetLoading] = useState(false);
  const { fullName, avatar } = useSelector(selectActivate);
  const { user } = useSelector(selectAuth);
  const navigate = useNavigate();
  const [image, setImage] = useState(
    "/images/avatar-default.jpeg" || user.avatar
  );
  const { isDarkMode } = useTheme();
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    if (!avatar) {
      setError("Please upload Profile picture");
      return;
    }
    SetLoading(true);
    try {
      const { data } = await activate({ fullName, avatar });
      const userData = data?.data;

      if (userData.auth) {
        dispatch(setAuth(userData));
        onNext();
        navigate("/chatroom");
      }
    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false);
    }
  };

  const handleChangeAvatar = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };

  if (loading) return <Loader message="Activation in Progress" />;
  return (
    <>
      <Button text="Back" onClick={onBack} />
      <Card title={`Ok, ${fullName} !`} className="my-6">
        <p className="text-xs">Please upload your picture.</p>
        <img
          className="w-20 h-20 rounded-full border-4 border-blue bg-primary object-cover "
          src={image}
          alt={fullName}
        />
        <p
          className={`${
            isDarkMode ? "text-grayLight" : "text-grayDarker"
          } text-xs `}
        >
          {error}
        </p>
        <label className={` text-blue text-xs mt-2`}>
          Choose a different photo
          <input type="file" className="hidden" onChange={handleChangeAvatar} />
        </label>

        <Button text="Next" onClick={handleSubmit} />
      </Card>
    </>
  );
};

export default StepAvatar;
