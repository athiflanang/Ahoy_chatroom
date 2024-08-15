import * as React from "react";

import {
    createBrowserRouter,
    redirect,
} from "react-router-dom";
import TopicSelection from "../views/TopicSelection";
import Chat from "../component/Chat";
import LoginPage from "../views/LoginPage";
import ChatSkeleton from "../component/ChatSkeleton";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: <TopicSelection />,
        loader: () => {
            if (!localStorage.username) {
                return redirect('/login')
            }

            return null
        }
    },
    {
        path: "/:topic/chat-test",
        element: <ChatSkeleton />,
    },
    {
        path: "/:topic",
        element: <ChatSkeleton />
    },
]);



export default router