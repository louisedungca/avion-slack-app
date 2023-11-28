import React, { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import * as l from "./layout";
import * as p from "./pages";
import * as c from "./components";
import * as u from "./utils";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <l.WelcomeLayout />,
      errorElement: <p.ErrorPage />,
      loader: u.isLoggedInLoader,
      children: [
        {
          path: "signup",
          element: <p.SignUpPage />,
          errorElement: <p.ErrorPage />,
          loader: u.isLoggedInLoader,
        },

        {
          path: "login",
          element: <p.LoginPage />,
          errorElement: <p.ErrorPage />,
          loader: u.isLoggedInLoader,
        },

        {
          path: "c",
          element: <l.MainPage />,
          errorElement: <p.ErrorPage />,
          loader: u.accessDashLoader,
          children: [
            {
              path: "chats",
              element: <l.ChatLayout />,
              errorElement: <p.ErrorPage />,
              loader: u.accessDashLoader,
              children: [
                {
                  index: true,
                  element: <c.Placeholder type={"chat"} />,
                  errorElement: <p.ErrorPage />,
                  loader: u.accessDashLoader,
                },
                {
                  path: ":id",
                  element: <p.ChatBox />,
                  errorElement: <p.ErrorPage />,
                  loader: u.accessDashLoader,
                },
              ],
            },
            {
              path: "channels",
              element: <l.ChannelLayout />,
              errorElement: <p.ErrorPage />,
              loader: u.accessDashLoader,
              children: [
                {
                  index: true,
                  element: <c.Placeholder type={"channel"} />,
                  errorElement: <p.ErrorPage />,
                  loader: u.accessDashLoader,
                },
                {
                  path: ":channel_id",
                  element: <p.ChannelBox />,
                  errorElement: <p.ErrorPage />,
                  loader: u.accessDashLoader,
                },
              ],
            },
            {
              path: "people",
              element: <p.People />,
              errorElement: <p.ErrorPage />,
              loader: u.accessDashLoader,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <StrictMode>
      <RouterProvider router={router} />
      <ToastContainer />
    </StrictMode>
  );
}

export default App;
