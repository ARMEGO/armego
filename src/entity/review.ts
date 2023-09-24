export interface IReview {
	id: string;
	rating: number;
	comments: string;
	reviewedBy: string;
}

export interface IGiveReview extends IReview {
	owner: string;
	assignedBy: string;
	assignedOn: Date;
}
