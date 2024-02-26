import React from "react";
import Card from "../../Components/UI/Card";
import Input from "../../Components/UI/Input";
import { useTheme } from "../../Components/UI/ThemeContex";
import { IoMdSend } from "react-icons/io";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import UserList from "./UserList";
import useChatRoom from "../../utils/useChatRoom";
import useSocket from "../../utils/useSocket";
const ChatRoom = () => {
  const { isDarkMode } = useTheme();
  const { socket, isConnected } = useSocket();

  const initialUsers = [
    {
      id: 1,
      fullName: "swapnil bhakare",
      avatar: "./images/avatar-default.jpeg",
    },
    {
      id: 2,
      fullName: "Raj",
      avatar: "./images/avatar-default.jpeg",
    },
    {
      id: 3,
      fullName: "Ram",
      avatar: "./images/avatar-default.jpeg",
    },
    // Add more users as needed
  ];

  const initialMessages = {
    1: [
      { sender: "swapnil bhakare", message: "Hello, how are you?" },
      { sender: "You", message: "Hi there, I'm good. How about you?" },
    ],
    2: [],
    3: [],
  };

  const {
    users,
    messages,
    selectedUser,
    inputValue,
    handleUserSelect,
    handleMessageSend,
    handleInputChange,
  } = useChatRoom(initialUsers, initialMessages);

  return (
    <div className="flex flex-col sm:flex-row w-full h-full max-h-screen">
      <UserList users={users} handleUserSelect={handleUserSelect} />

      {selectedUser ? (
        <Card
          className="w-full sm:w-8/10 flex-grow my-1 mt-1 h-full mx-auto flex flex-col justify-between"
          style={{ maxHeight: "calc(100vh - 5rem)" }}
        >
          <div className="w-full overflow-y-auto h-[400px]">
            {selectedUser &&
              messages[selectedUser.id] &&
              messages[selectedUser.id].map((msg, index) => (
                <div key={index}>
                  {msg.sender === selectedUser.fullName ? (
                    <ReceiverMessage message={msg.message} time="Now" />
                  ) : (
                    <SenderMessage message={msg.message} time="2 min ago" />
                  )}
                </div>
              ))}
          </div>

          <div className="flex w-full items-center justify-between p-1">
            <Input
              className={`flex-grow mx-1 ${
                isDarkMode ? "bg-primary text-white" : "bg-smoke text-primary"
              }`}
              type="text"
              placeholder="Type your message…"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className={`text-2xl rounded-full p-2 flex items-center justify-center ${
                isDarkMode ? "text-white" : "text-primary"
              } mx-3 bg-green`}
              onClick={handleMessageSend}
            >
              <IoMdSend />
            </button>
          </div>
        </Card>
      ) : (
        <Card
          className="w-full sm:w-8/10 flex-grow mt-1 mx-auto"
          style={{ maxHeight: "calc(100vh - 5rem)" }}
        >
          <p>Welcome to IlanoS chat room</p>
        </Card>
      )}
    </div>
  );
};

export default ChatRoom;
