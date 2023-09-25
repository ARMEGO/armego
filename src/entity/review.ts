export interface IReview {
	id: string;
	rating: number;
	comments: string;
	reviewedBy: string;
}

/**
 * Define contract requesting review(by admin)
 */
export interface IGiveReview extends IReview {
	owner: string;
	assignedBy: string;
	assignedOn: Date;
}
