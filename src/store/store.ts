import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import qnaReducer from "../slices/qnaSlice";

const logger = createLogger();

const store = configureStore({
    reducer: {
        qna: qnaReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;