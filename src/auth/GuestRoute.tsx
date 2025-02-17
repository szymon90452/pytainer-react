import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default GuestRoute;
