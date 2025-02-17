import { Outlet } from "react-router-dom";

const PermissionRoute = () => {
  const token = localStorage.getItem("token");

  return token === undefined ? (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      loading
    </div>
  ) : (
    <Outlet />
  );
};

export default PermissionRoute;
