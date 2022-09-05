import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import { reducer } from "./reducer";
import logger from 'redux-logger'

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
