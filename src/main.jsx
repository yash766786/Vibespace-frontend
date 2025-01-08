// main.jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AlertProvider } from "./context/AlertState.jsx";
import { UserProvider } from "./context/UserState.jsx";
import { NoteProvider } from "./context/NoteState.jsx";
import { PostProvider } from "./context/PostState.jsx";
import { CommentProvider } from "./context/CommentState.jsx";
import { LikeProvider } from "./context/LikeState.jsx";
import { FollowProvider } from "./context/FollowState.jsx";

import {
  About,
  Signup,
  Login,
  Profile,
  Settings,
  Home,
  CreatePost,
  Notes,
  CreateNote,
  Verify,
  PasswordReset
} from "./pages/pageIndex.js";
// import Verify from "./pages/Verify.jsx";
// Verify

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/password-reset",
        element: <PasswordReset />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/u/:username",
        element: <Profile />,
      },
      {
        path: "/setting",
        element: <Settings />,
      },
      {
        path: "/", // You can set the Home component here
        element: <Home />,
      },
      {
        path: "/create-post", // Updated the path to match your structure
        element: <CreatePost />,
      },
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/create-note",
        element: <CreateNote />,
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <PostProvider>
      <CommentProvider>
        <LikeProvider>
          <FollowProvider>
            <NoteProvider>
              <AlertProvider>
                <RouterProvider router={router} />
              </AlertProvider>
            </NoteProvider>
          </FollowProvider>
        </LikeProvider>
      </CommentProvider>
    </PostProvider>
  </UserProvider>
);
