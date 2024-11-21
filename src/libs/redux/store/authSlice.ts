import { Account } from "@/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	account: Account | null;
}

const initialState: AuthState = {
	account: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<AuthState | null>) => {
            state.account = action.payload?.account || null;
		},
		resetAuth: () => {
			return initialState;
		}
	},
});

export const { setAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
