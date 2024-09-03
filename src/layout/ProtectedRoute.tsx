import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { currentToken, logout } from '../Redux/features/auth/authSlice';
import { verifyToken } from '../utility/verifyToken';
import { ReactNode } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

type TProtectedRoute = {
    children: ReactNode;
    role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
    const dispatch = useAppDispatch();
    const location = useLocation(); console.log(location);
    const token = useAppSelector(currentToken);

    let user;
    if (token) {
        user = verifyToken(token);
    }

    if (user?.role !== role) {
        console.log("Ho")
        dispatch(logout());
        return <Navigate to={"/signIn"} state={{ from: location?.pathname }} />
    }

    if (!token) {
        return <Navigate to="/login" state={{ from: location?.pathname }} replace={true} />;
    }

    return children;
};

export default ProtectedRoute;