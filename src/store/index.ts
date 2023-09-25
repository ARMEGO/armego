import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import employeesSlice from "./employeesSlice";
import employeeReviewsSlice from "./employeeReviewsSlice";
import reviewRequestsSlice from "./reviewRequestsSlice";

export const store = configureStore({
	reducer: {
		user: userSlice,
		employees: employeesSlice,
		employeeReviews: employeeReviewsSlice,
		reviewRequests: reviewRequestsSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
