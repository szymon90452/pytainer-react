import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import scriptsReducer from "./slice/scriptsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    scripts: scriptsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
