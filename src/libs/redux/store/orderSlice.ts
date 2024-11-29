import { Order } from '@/src/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
	orders: Order[] | null;
}

const initialState: OrderState = {
	orders: null
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrder: (state, action: PayloadAction<Order[] | null>) => {
			state.orders = action.payload;
		},
	},
});

export const { setOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
