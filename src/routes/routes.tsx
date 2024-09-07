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
import ProtectedRoute from "../layout/ProtectedRoute";
import OverviewBookings from "../pages/Admin/OverviewBookings";
import ServiceManagement from "../pages/Admin/ServiceManagement";
import SlotManagement from "../pages/Admin/SlotManagement";
import UserManagement from "../pages/Admin/UserManagement";
import UserBookings from "../pages/Admin/UserBooking";
import UserBookingOverview from "../pages/User/UserBookingOverview";
import UserProfile from "../pages/User/UserProfile";

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
                element: <ProtectedRoute role="user">
                    <Booking />
                </ProtectedRoute>,
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [

            // for admin
            {
                path: "admin/overview",
                element: <ProtectedRoute role={"admin"}>
                    <OverviewBookings />,
                </ProtectedRoute>
            },
            {
                path: "admin/serviceManagement",
                element:
                    <ProtectedRoute role={"admin"}>
                        <ServiceManagement />
                    </ProtectedRoute>,
            },
            {
                path: "admin/slotsManagement",
                element: <ProtectedRoute role={"admin"}>
                    <SlotManagement />,
                </ProtectedRoute>
            },
            {
                path: "admin/userManagement",
                element: <ProtectedRoute role={"admin"}>
                    <UserManagement />
                </ProtectedRoute>
            },
            {
                path: "admin/userBooking",
                element: <ProtectedRoute role="admin">
                    <UserBookings />
                </ProtectedRoute >
            },
            // for user
            {
                path: "user/overview",
                element: <ProtectedRoute role={"user"}>
                    <UserBookingOverview />,
                </ProtectedRoute>
            },
            {
                path: "user/profile",
                element: <ProtectedRoute role={"user"}>
                    <UserProfile />,
                </ProtectedRoute>
            },
            {
                path: "user/serviceManagement",
                element: <ServiceManagement />,
            },

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