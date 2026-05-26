import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import qnaReducer from "../slices/qnaSlice";
import memberReducer from "../slices/memberSlice";

const logger = createLogger();

const store = configureStore({
    reducer: {
        qna: qnaReducer,
        member: memberReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;