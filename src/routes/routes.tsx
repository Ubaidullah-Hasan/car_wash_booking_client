import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Services from "../pages/services/Services";
import Booking from "../pages/booking/Booking";
import Home from "../pages/home/home/Home";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import Review from "../pages/reviews/Review";

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
                path: "reviews",
                element: <Review />,
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