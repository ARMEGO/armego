export interface IReview {
	id: string;
	rating: number;
	comments: string;
	reviewed_by: string;
}

/**
 * Define contract requesting review(by admin)
 */
export interface IGiveReview extends IReview {
	owner: string;
	assigned_by: string;
	assigned_on: Date;
}
