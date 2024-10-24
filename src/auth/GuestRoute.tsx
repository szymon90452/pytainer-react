import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
    const user = true;

    return user ? <Navigate to="/" /> : <Outlet />;
};

export default GuestRoute;