import React from "react";
import { useTheme } from "./Components/UI/ThemeContex";
import Header from "./Components/Header";
import {
  createBrowserRouter,
  Outlet,
  Route,
  useLocation,
} from "react-router-dom";
import Authenticate from "./Pages/Authenticate.js";
import ChatRoom from "./Pages/ChatRoom.js";
import Activate from "./Pages/Activate";
import { selectAuth } from "./store/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Home from "./Pages/Home";

export const App = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`h-screen font-nunito transition-colors duration-500 ${
        isDarkMode ? "bg-primary text-smoke" : "bg-smoke"
      }`}
    >
      <Header />
      <Outlet />
    </div>
  );
};

const ActivateRoute = () => {
  const auth = useSelector(selectAuth);
  console.log(auth);
  const { isAuth, user } = auth;
  console.log(user);
  return isAuth ? <Activate /> : <Navigate to="/" />;
};
const ProtectedRoute = () => {
  const auth = useSelector(selectAuth);
  // console.log(auth);
  const { isAuth, user } = auth;
  console.log(isAuth);
  return isAuth && user.activated ? <ChatRoom /> : <Navigate to="/" />;
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
