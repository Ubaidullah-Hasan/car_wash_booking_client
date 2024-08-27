import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Services from "../pages/services/Services";
import Booking from "../pages/booking/Booking";
import Home from "../pages/home/Home";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "services",
                element: <Services />,
            },
            {
                path: "booking",
                element: <Booking />,
            },
            {
                path: "booking/book",
                element: <Booking />,
            }
        ]
    },
    {
        path: "/signin",
        element: <SignIn />
    },
    {
        path: "/signup",
        element: <SignUp />
    }
]);

export default router;