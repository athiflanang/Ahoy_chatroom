import { RouterProvider } from "react-router-dom";
import router from "./routers";
import { ProfileProvider } from "../ProfileContext";

export default function App() {
    return (
        <>
        <ProfileProvider>
            <RouterProvider router={router} />
        </ProfileProvider>
        </>
    )
}