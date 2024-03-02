import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { socket_url } from "./constant";

const socket = io(socket_url, {
  withCredentials: true,
});

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected:", socket.id);
      setIsConnected(false);
    };

    const handleError = (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleError);

    socket.emit("join-room");

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleError);
    };
  }, []);

  return {
    socket,
    isConnected,
  };
};

export default useSocket;
