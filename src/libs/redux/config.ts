import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authReducer, cartReducer, detailInfomationReducer, favoriteReducer, feedbackReducer } from "./store";


export const store = configureStore({
	reducer: {
		detailInfomation: detailInfomationReducer,
		favorite: favoriteReducer,
		auth: authReducer,
		feedback: feedbackReducer,
		cart: cartReducer
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();