import React, { Suspense, lazy } from "react";
import { useTheme } from "./Components/UI/ThemeContex";
import Header from "./Components/Header";
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "./store/authSlice";
import { useLoadingWithRefresh } from "./utils/useLoadingWithRefresh";
import Loader from "./Components/UI/Loader";
import Profile from "./Pages/Profile";

const Home = lazy(() => import("./Pages/Home"));
const Authenticate = lazy(() => import("./Pages/Authenticate"));
const Activate = lazy(() => import("./Pages/Activate"));
const ChatRoom = lazy(() => import("./Pages/ChatRoom/ChatRoom"));

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
        <Loader message="Loading Please wait" />
      ) : (
        <>
          <Header user={user} />
          <Suspense fallback={<Loader message="Loading..." />}>
            <Outlet />
          </Suspense>
        </>
      )}
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
