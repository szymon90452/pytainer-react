import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const user = true;

    if (user) {
        return <Outlet />;
    }
    return <Navigate to={"/login"} />;
};

export default PrivateRoute;