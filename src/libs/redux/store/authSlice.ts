import { Account, Role } from "@/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
	account: Account | null;
	role: Role | null
}

const initialState: AuthState = {
	account: null,
	role: null
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<AuthState | null>) => {
            state.account = action.payload?.account || null;
			state.role = action.payload?.role || null;
		},
		resetAuth: () => {
			return initialState;
		}
	},
});

export const { setAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
