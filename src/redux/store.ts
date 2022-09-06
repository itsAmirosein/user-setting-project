import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import { reducer } from "./reducer";
import logger from 'redux-logger'
import createSagaMiddleware from "redux-saga";
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger,sagaMiddleware),
});
sagaMiddleware.run(saga)

export default store;
