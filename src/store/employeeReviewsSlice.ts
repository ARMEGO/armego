import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IEmployeeReviews } from "../entity/employee";
import { IReview } from "../entity/review";
import { RootState } from ".";

const initialState: IEmployeeReviews = {
	employee: null,
	reviews: [],
};

/**
 * redux slice to add, update or delete employee review
 */
export const employeeReviewsSlice = createSlice({
	name: "employeeReviews",
	initialState,
	reducers: {
		/**
		 * Set whole state with employee and reviews
		 * @param _state
		 * @param action
		 * @returns payload
		 */
		addEmployeeReviews: (_state, action: PayloadAction<IEmployeeReviews>) =>
			action.payload,
		/**
		 * Add employee review.
		 * TODO: Avoid generating id here. Server handles this
		 * @param state
		 * @param action
		 */
		addEmployeeReview: (state, action: PayloadAction<IReview>) => {
			const review = action.payload;
			review.id = (Math.random() + 1).toString(36).substring(7);
			state.reviews = [review, ...state.reviews];
		},
		updateEmployeeReview: (state, action: PayloadAction<IReview>) => {
			state.reviews = state.reviews.map((review: IReview) => {
				if (review.id !== action.payload.id) {
					// This isn't the item we care about - keep it as-is
					return review;
				}

				// Otherwise, this is the one we want - return an updated value
				return {
					...review,
					...action.payload,
				};
			});
		},
		/**
		 * Ignore deleted user
		 * @param state
		 * @param action
		 */
		removeEmployeeReview: (state, action: PayloadAction<string>) => {
			state.reviews = state.reviews.filter(
				(review) => review.id !== action.payload,
			);
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addEmployeeReviews,
	addEmployeeReview,
	updateEmployeeReview,
	removeEmployeeReview,
} = employeeReviewsSlice.actions;

/**
 * Find review by id
 * @param state
 * @param id
 * @returns selected employee review
 */
export const selectReviewById = (state: RootState, id: string) => {
	const review = state.employeeReviews.reviews.find(
		(review) => review.id === id,
	);
	return review;
};

export default employeeReviewsSlice.reducer;
