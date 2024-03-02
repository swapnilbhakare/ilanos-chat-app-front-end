import { useEffect, useState } from "react";
import useSocket from "./useSocket";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setAuth } from "../store/authSlice";
import { logout } from "../http/index";
import { useNavigate } from "react-router-dom";
const useChatRoom = () => {
  const { socket } = useSocket();
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = auth.user;

  const [messages, setMessages] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [room, setRoom] = useState("");

  const logoutUser = async () => {
    try {
      const data = await logout();
      dispatch(setAuth(data));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserSelect = (user) => {
    if (currentUser && user) {
      setSelectedUser(user);
      if (!messages[user.id]) {
        setMessages({ ...messages, [user.id]: [] });
      }
      const roomIdentifier = [currentUser.id, user.id].sort().join("-");
      setRoom(roomIdentifier);
      socket.emit("join-user-room", roomIdentifier);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (!currentUser || inputValue.trim() === "") return;

    const message = {
      sender: currentUser,
      receiver: selectedUser,
      message: inputValue,
    };

    const updatedMessages = {
      ...messages,
      [selectedUser.id]: [...(messages[selectedUser.id] || []), message],
    };

    socket.emit("sent-message", { room, message });

    setInputValue("");
    setMessages(updatedMessages);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("receive-message", (data) => {
      const { message } = data;
      console.log(data);
      setMessages((prevMessages) => {
        return {
          ...prevMessages,
          [message.sender.id]: [
            ...(prevMessages[message.sender.id] || []),
            message,
          ],
        };
      });
    });

    return () => {
      if (socket) {
        socket.off("receive-message");
      }
    };
  }, [socket]);

  return {
    messages: messages[selectedUser?.id] || [],
    selectedUser,
    inputValue,
    handleUserSelect,
    handleMessageSend,
    handleInputChange,
    logoutUser,
  };
};

export default useChatRoom;
