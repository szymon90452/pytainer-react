import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RouterProvider from "./RouterProvider/RouterProvider";
import { store } from "@/redux/store";

const index = () => {
  return (
    <Provider store={store}>
      <ToastContainer position="bottom-right" />
      <RouterProvider />
    </Provider>
  );
};

export default index;
