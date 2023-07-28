import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { loader as gameLoader } from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import Error from "./pages/Error";
import Games, { loader as gamesLoader } from "./pages/Games";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "games",
        element: <Games />,
        loader: gamesLoader,
      },
      {
        path: "games/:gameId",
        element: <App />,
        loader: gameLoader,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
