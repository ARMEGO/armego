import { IReview } from "./review";

export interface IEmployee {
	id: string;
	username: string;
	reviews: number;
	rating: number;
}

export interface IEmployeeReviews {
	employee: IEmployee | null;
	reviews: IReview[];
}
