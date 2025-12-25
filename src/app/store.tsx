import { configureStore } from "@reduxjs/toolkit";
import calcReducer from "../features/calc/calcSlice";
import fetchReducer from "../features/fetch/fetchSlice";

export const store = configureStore({
  reducer: {
    multi: calcReducer,
    fetch: fetchReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
