import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { appRouter } from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./Components/UI/ThemeContex";

import store from "./store/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom/dist";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
