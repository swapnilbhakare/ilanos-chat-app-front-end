import { useState } from "react";

const useChatRoom = (initialUsers, initialMessages) => {
  const [users, setUsers] = useState(initialUsers);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleUserSelect = (user) => {
    setSelectedUser((prevSelectedUser) =>
      prevSelectedUser && prevSelectedUser.id === user.id ? null : user
    );
  };

  const handleMessageSend = () => {
    if (!selectedUser || inputValue.trim() === "") return;

    const newMessage = {
      sender: "You",
      message: inputValue,
    };

    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedUser.id]: [...(prevMessages[selectedUser.id] || []), newMessage],
    }));

    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return {
    users,
    messages,
    selectedUser,
    inputValue,
    handleUserSelect,
    handleMessageSend,
    handleInputChange,
  };
};

export default useChatRoom;
