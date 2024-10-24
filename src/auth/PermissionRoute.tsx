import { Outlet } from "react-router-dom";

const PermissionRoute = () => {
    const user = true;

    const isUserLoading = false;

    return user === undefined || isUserLoading ? (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            loading
        </div>
    ) : (
        <Outlet />
    );
};

export default PermissionRoute;