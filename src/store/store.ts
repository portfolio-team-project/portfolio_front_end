import { configureStore } from "@reduxjs/toolkit";
import qnaReducer from "../slices/qnaSlice";
import memberReducer from "../slices/memberSlice";

const store = configureStore({
    reducer: {
        qna: qnaReducer,
        member: memberReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;