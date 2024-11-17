import { Provider } from "react-redux";
import RouterProvider from "./RouterProvider/RouterProvider";
import { store } from "@/redux/store";

const index = () => {
  return (
    <Provider store={store}>
      <RouterProvider />
    </Provider>
  );
};

export default index;
