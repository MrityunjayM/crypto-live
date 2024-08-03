"use client";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cryptoReducer from "./features/cryptoSlice";

const store = configureStore({
  reducer: { crypto: cryptoReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;
