import * as React from "react";

import {
    createBrowserRouter,
    redirect,
} from "react-router-dom";
import TopicSelection from "../views/TopicSelection";
import Chat from "../component/Chat";
import LoginPage from "../views/LoginPage";
import ChatSkeleton from "../component/ChatSkeleton";
import LandingPage from "../views/LandingPage";

const router = createBrowserRouter([
 
    {
        path: "/topic",
        element: <TopicSelection />,
        loader: () => {
            if (!localStorage.username) {
                return redirect('/')
            }

            return null
        }
    },
    {
        path: "/",
        element: <LandingPage/>
    },
    {
        path: "/:topic",
        element: <ChatSkeleton />
    },
]);



export default router