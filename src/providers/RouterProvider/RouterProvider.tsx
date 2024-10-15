import { BrowserRouter } from "react-router-dom";

import NavigationRoutes from "../../routes/NavigationRoutes";

const RouterProvider = () => {
    return (
        <BrowserRouter>
            <NavigationRoutes />
        </BrowserRouter>
    );
};

export default RouterProvider;