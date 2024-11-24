import { DetailInformation } from "@/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetailInfomationState {
	detailInfomation: DetailInformation | null;
}

const initialState: DetailInfomationState = {
    detailInfomation: null
};

const detailInfomationSlice = createSlice({
	name: 'detailInfomation',
	initialState,
	reducers: {
		setDetailInfomation: (
			state,
			action: PayloadAction<DetailInformation | null>,
		) => {
			state.detailInfomation = action.payload;
		},
	},
});

export const { setDetailInfomation } = detailInfomationSlice.actions;
export const detailInfomationReducer = detailInfomationSlice.reducer;
