import { Product } from "@/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
	favorite: Product[] | null;
}

const initialState: FavoriteState = {
	favorite: null
};

const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		setFavorite: (state, action: PayloadAction<Product[] | null>) => {
			state.favorite = action.payload;
		},
		addFavorite: (state, action: PayloadAction<Product>) => {
			if (!state.favorite) {
				state.favorite = [action.payload];
			} else {
				state.favorite.push(action.payload);
			}
		},
		removeFavorite: (state, action: PayloadAction<string>) => {
			if (state.favorite) {
				state.favorite = state.favorite.filter((item) => item.id !== action.payload);
			}
		}
	}
});

export const { setFavorite, addFavorite, removeFavorite } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;