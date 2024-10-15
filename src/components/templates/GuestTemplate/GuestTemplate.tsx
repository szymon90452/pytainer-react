import { Outlet } from "react-router-dom";

const GuestTemplate = () => {
    return (
        <div className="relative flex items-center justify-center h-screen w-screen">
            <Outlet />
        </div>
    );
};

export default GuestTemplate;