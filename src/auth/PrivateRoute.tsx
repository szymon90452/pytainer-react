import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Outlet />;
  }
  return <Navigate to={"/login"} />;
};

export default PrivateRoute;
