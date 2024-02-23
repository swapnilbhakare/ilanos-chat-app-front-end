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
const StepAvatar = () => {
  const dispatch = useDispatch();
  const { fullName, avatar } = useSelector(selectActivate);
  const { user } = useSelector(selectAuth);
  const navigate = useNavigate();
  const [image, setImage] = useState("" || user.avatar);

  const handleSubmit = async () => {
    try {
      const { data } = await activate({ fullName, avatar });
      const userData = data?.data;

      if (userData.auth) {
        dispatch(setAuth(userData));
        navigate("/chatroom");
      }
    } catch (error) {
      console.log(error);
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

  return (
    <Card title={`Ok, ${fullName} !`}>
      <p className="text-xs">Please upload your picture.</p>
      <img
        className="w-20 h-20 rounded-full border-4 border-blue bg-primary "
        src={image}
        alt={fullName}
      />
      <label className={` text-blue text-xs mt-2`}>
        Choose a different photo
        <input type="file" className="hidden" onChange={handleChangeAvatar} />
      </label>

      <Button text="Next" onClick={handleSubmit} />
    </Card>
  );
};

export default StepAvatar;
