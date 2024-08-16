import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import commonReducer from "./Slices/CommonSlice"

const Store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer
  },
});

export default Store;
