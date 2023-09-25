import { IReview } from "./review";

export interface IEmployee {
	id: string;
	username: string;
	reviews: number; // no. of reviews made
	rating: number; // total rating divide by reviews
}

// each employee has reviews
export interface IEmployeeReviews {
	employee: IEmployee | null;
	reviews: IReview[];
}
