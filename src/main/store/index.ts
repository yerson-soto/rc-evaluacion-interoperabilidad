import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { authSlice } from "./slices/authSlice";
import { evaluationSlice } from "./slices/evaluationSlice";
import { domainSlice } from "./slices/domainSlice";
import { lineamentSlice } from './slices/lineamentSlice';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [evaluationSlice.name]: evaluationSlice.reducer,
    [domainSlice.name]: domainSlice.reducer,
    [lineamentSlice.name]: lineamentSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
