
import { configureStore } from "@reduxjs/toolkit";
import routerReducer from "./src/slices/routeSlice";

export const store = configureStore({
  reducer: {
    router: routerReducer,
  },
});
