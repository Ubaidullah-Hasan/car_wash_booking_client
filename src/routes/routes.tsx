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
import Admin from "../pages/Admin/Admin";
import DashboardLayout from "../layout/DashboardLayout";
import User from "../pages/User/User";
import PaymentPage from "../pages/paymentPage/PaymentPage";
import PaymentSuccess from "../pages/paymentPage/PaymentSuccess";
import PaymentFail from "../pages/paymentPage/PaymentFail";
import PaymentCancel from "../pages/paymentPage/PaymentCancel";

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
                path: "reviews",
                element: <Review />,
            },
            {
                path: "booking",
                element: <Booking />,
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "admin",
                element: <Admin />
            },
            {
                path: "user",
                element: <User />
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
    },
    {
        path: "payment/success",
        element: <PaymentSuccess />,
    },
    {
        path: "payment/fail",
        element: <PaymentFail />,
    },
    {
        path: "payment/cancel",
        element: <PaymentCancel />,
    },
]);

export default router;