import { useAppSelector } from "@/hooks/useRedux";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
    const user = useAppSelector((state) => state.user.user);

    return user ? <Navigate to="/" /> : <Outlet />;
};

export default GuestRoute;