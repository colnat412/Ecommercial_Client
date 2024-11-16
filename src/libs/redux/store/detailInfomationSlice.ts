import { DetailInfomation } from "@/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetailInfomationState {
    detailInfomation: DetailInfomation | null;
}

const initialState: DetailInfomationState = {
    detailInfomation: null
};

const detailInfomationSlice = createSlice({
	name: 'detailInfomation',
	initialState,
	reducers: {
		setDetailInfomation: (state, action: PayloadAction<DetailInfomation | null>) => {
			state.detailInfomation = action.payload;
		},
	},
});

export const { setDetailInfomation } = detailInfomationSlice.actions;
export const detailInfomationReducer = detailInfomationSlice.reducer;
