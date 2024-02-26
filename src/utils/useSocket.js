import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { socket_url } from "./constant";
const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  console.log(socket_url);
  useEffect(() => {
    const newSocket = io(socket_url, {
      transports: ["websocket"],
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log(newSocket.id);
      setSocket(newSocket);
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log(newSocket.id);
      setIsConnected(false);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  return { socket, isConnected };
};

export default useSocket;
