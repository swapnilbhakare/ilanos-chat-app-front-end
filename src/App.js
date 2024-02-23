import React from "react";
import { useTheme } from "./Components/UI/ThemeContex";
import Header from "./Components/Header";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Authenticate from "./Pages/Authenticate.js";
import ChatRoom from "./Pages/ChatRoom.js";
import Activate from "./Pages/Activate";
import { selectAuth } from "./store/authSlice";
import { useSelector } from "react-redux";

import Home from "./Pages/Home";
import { useLoadingWithRefresh } from "./utils/useLoadingWithRefresh.js";

export const App = () => {
  const { user } = useSelector(selectAuth);
  const { isDarkMode } = useTheme();
  const { loading } = useLoadingWithRefresh();
  return (
    <div
      className={`h-screen font-nunito transition-colors duration-500 ${
        isDarkMode ? "bg-primary text-smoke" : "bg-smoke"
      }`}
    >
      {loading ? (
        "Loading "
      ) : (
        <>
          <Header user={user} />
          <Outlet />
        </>
      )}
    </div>
  );
};

const ActivateRoute = () => {
  const auth = useSelector(selectAuth);
  console.log(auth);
  const { isAuth, user } = auth;
  console.log(user);
  return isAuth && <Activate />;
};
const ProtectedRoute = () => {
  const auth = useSelector(selectAuth);

  const { isAuth, user } = auth;

  return isAuth && user.activated && <ChatRoom />;
};

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/authenticate",
        element: <Authenticate />,
      },
      {
        path: "/activate",
        element: <ActivateRoute />,
      },
      {
        path: "/chatroom",
        element: <ProtectedRoute />,
      },
    ],
  },
];

const appRouter = createBrowserRouter(routes);

export { appRouter };
