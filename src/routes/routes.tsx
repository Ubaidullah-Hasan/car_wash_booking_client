import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Booking from "../pages/booking/BookingPage";
import Home from "../pages/home/home/Home";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import Review from "../pages/reviews/Review";
import ServicesPage from "../pages/services/ServicesPage";
import ServiceDetailsPage from "../pages/serviceDetailsPage/ServiceDetailsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "services",
                element: <ServicesPage />,
            },
            {
                path: "services/:serviceId",
                element: <ServiceDetailsPage />,
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