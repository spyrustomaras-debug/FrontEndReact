import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profiles/profileSlice";
import authorReducer from "../features/authors/authorSlice";

export const store = configureStore({
  reducer: {
    profiles: profileReducer,
    authors: authorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
