import { configureStore } from "@reduxjs/toolkit";
import qnaReducer from "../slices/qnaSlice";
import memberReducer from "../slices/memberSlice";
import adminReducer from "../slices/adminSlice";

const store = configureStore({
    reducer: {
        qna: qnaReducer,
        member: memberReducer,
        admin: adminReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;