import React, { Suspense, lazy } from "react";
import { useTheme } from "./Components/UI/ThemeContex";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createBrowserRouter,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "./store/authSlice";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";

import Loader from "./Components/UI/Loader";

import { useLoadingWithRefresh } from "./utils/useLoadingWithRefresh";
const Home = lazy(() => import("./Pages/Home"));
const Authenticate = lazy(() => import("./Pages/Authenticate"));
const Activate = lazy(() => import("./Pages/Activate"));
const ChatRoom = lazy(() => import("./Pages/ChatRoom/ChatRoom"));

export const App = () => {
  const { isDarkMode } = useTheme();

  const { loading } = useLoadingWithRefresh();

  const location = useLocation();
  return (
    <div
      className={`h-screen max-h-screen font-nunito ${
        isDarkMode ? "bg-primary text-smoke" : "bg-smoke"
      }`}
      style={{ backgroundColor: isDarkMode ? "#121212" : "#FFFFFF" }}
    >
      {location.pathname !== "/chatroom" && <Header />}

      <>
        {loading ? (
          <Loader message="Loading Please wait" />
        ) : (
          <>
            <Suspense fallback={<Loader message="Loading..." />}>
              <Outlet />
            </Suspense>
          </>
        )}
      </>
    </div>
  );
};

const ActivateRoute = () => {
  const { isAuth } = useSelector(selectAuth);

  return isAuth ? <Activate /> : null;
};

const ProtectedRoute = () => {
  const { isAuth, user } = useSelector(selectAuth);

  if (!isAuth) {
    return <Navigate to="/" />;
  } else if (isAuth && user && user.activated) {
    return <ChatRoom />;
  } else {
    return <Navigate to="/activate" />;
  }
};

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/authenticate", element: <Authenticate /> },
      { path: "/activate", element: <ActivateRoute /> },
      { path: "/chatroom", element: <ProtectedRoute /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
];

const appRouter = createBrowserRouter(routes);

export { appRouter };
