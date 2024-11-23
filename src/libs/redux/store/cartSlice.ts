import { Account, CartItem } from '@/src/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
	cartItem: CartItem[] | null;
}

const initialState: CartState = {
	cartItem: null,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCart: (state, action: PayloadAction<CartItem[] | null>) => {
			state.cartItem = action.payload;
		},
		resetCart: () => {
			return initialState;
		},
	},
});

export const { setCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
