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
import DashboardLayout from "../layout/DashboardLayout";
import User from "../pages/User/User";
import ProtectedRoute from "../layout/ProtectedRoute";
import OverviewBookings from "../pages/Admin/OverviewBookings";
import ServiceManagement from "../pages/Admin/ServiceManagement";
import SlotManagement from "../pages/Admin/SlotManagement";

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
                element: <ProtectedRoute role={"user"}>
                    <Booking />
                </ProtectedRoute>,
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "admin/overview",
                element: <OverviewBookings />,
            },
            {
                path: "admin/serviceManagement",
                element: <ServiceManagement />,
            },
            {
                path: "admin/slotsManagement",
                element: <SlotManagement />,
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
    }
]);

export default router;