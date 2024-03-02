import React, { useEffect, useRef } from "react";
import Input from "../../Components/UI/Input";
import { useTheme } from "../../Components/UI/ThemeContex";
import { IoMdSend } from "react-icons/io";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import UserList from "./UserList";
import useChatRoom from "../../utils/useChatRoom";
import { selectAuth } from "../../store/authSlice";
import { useSelector } from "react-redux";
import { MdOutlineArrowBack } from "react-icons/md";
import useSocket from "../../utils/useSocket";

const ChatRoom = () => {
  const auth = useSelector(selectAuth);
  const currentUser = auth.user;
  const { isDarkMode } = useTheme();
  const { isConnected } = useSocket();

  const {
    messages,
    selectedUser,
    inputValue,
    handleUserSelect,
    handleMessageSend,
    handleInputChange,
  } = useChatRoom();

  const handleUserSelectFromSearch = (user) => {
    handleUserSelect(user);
  };

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageSendAndScroll = (e) => {
    handleMessageSend(e);
    scrollToBottom();
  };

  return (
    <div
      className={` flex flex-col justify-between lg:flex-row w-full h-full ${
        isDarkMode ? "bg-primary" : "bg-white"
      }`}
    >
      <UserList
        users={[]}
        handleUserSelect={handleUserSelect}
        handleSelectFromSearch={handleUserSelectFromSearch}
        className={selectedUser ? "lg:w-1/4" : "lg:w-1/4 lg:block hidden "}
      />
      <div
        className={`${
          isDarkMode ? "bg-secondary" : "bg-smoke"
        } w-full lg:w-3/4  flex flex-col h-full`}
      >
        {selectedUser && (
          <div
            className={`w-full flex items-center p-3 ${
              isDarkMode ? "bg-primary" : "bg-smoke"
            }`}
          >
            <MdOutlineArrowBack
              className="back-button text-xl mr-2 cursor-pointer"
              onClick={() => handleUserSelect(null)}
            />
            <img
              src={selectedUser.avatar}
              alt={selectedUser.fullName}
              className="w-10 h-10 rounded-full object-cover mx-3"
            />
            <div>
              <h2 className="text-xl font-bold">{selectedUser.fullName}</h2>
              <span className="text-sm">
                {isConnected ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        )}
        <div className={`h-full px-40  flex-grow overflow-y-auto  `}>
          {messages.map((msg, index) =>
            msg.sender.id === currentUser.id ? (
              <SenderMessage
                key={index}
                message={msg.message}
                time="Now"
                sender={msg.sender}
              />
            ) : (
              <ReceiverMessage
                key={index}
                message={msg.message}
                time="2 min ago"
                receiver={msg.sender}
              />
            )
          )}
          <div ref={messagesEndRef} />
        </div>
        {selectedUser && (
          <form
            onSubmit={handleMessageSendAndScroll}
            className="flex items-center justify-between p-2 px-60  flex-grow"
          >
            <Input
              className={`flex-grow  rounded-lg px-4 py-2 focus:outline-none ${
                isDarkMode ? "bg-primary " : "bg-white"
              }`}
              type="text"
              placeholder="Type your message…"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className={`text-2xl rounded-full p-3 ml-2 ${
                isDarkMode ? "bg-primary text-white" : "bg-white text-blue"
              }`}
            >
              <IoMdSend />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
