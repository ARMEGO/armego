import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IGiveReview } from "../entity/review";
import { RootState } from ".";

const initialState: IGiveReview[] = [];

export const reviewRequestsSlice = createSlice({
	name: "reviewRequests",
	initialState,
	reducers: {
		addReviews: (_state, action: PayloadAction<IGiveReview[]>) =>
			action.payload,
		addReview: (state, action: PayloadAction<IGiveReview>) => {
			const review = action.payload;
			review.id = (Math.random() + 1).toString(36).substring(7);
			return [review, ...state];
		},
	},
});

// Action creators are generated for each case reducer function
export const { addReview, addReviews } = reviewRequestsSlice.actions;

// selector for reviews
export const selectReviewById = (state: RootState, id: string) => {
	const review = state.reviewRequests.find((review) => review.id === id);
	return review;
};

export default reviewRequestsSlice.reducer;
