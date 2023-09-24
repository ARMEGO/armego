import { randomString } from "../../common";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { styled } from "styled-components";
import { Dialog } from "primereact/dialog";
import { IGiveReview } from "../../entity/review";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { InputTextarea } from "primereact/inputtextarea";
import { addReview, addReviews } from "../../store/reviewRequestsSlice";

const Main = styled.main`
    padding: 16px;
`;

const FlexHorizontal = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid #ddd;
	padding: 8px 16px;
	margin-bottom: 16px;
`;

const FlexRowReverse = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row-reverse;
`;

const emptyReview = {
	id: "",
	rating: 0,
	comments: "",
	reviewedBy: "",
	owner: "",
	assignedBy: "admin",
	assignedOn: new Date(),
};

const dummyData = () => {
	let dummy = [];
	for (let i = 0; i < 50; i++) {
		dummy.push({
			id: randomString(),
			comments: "",
			reviewedBy: "",
			rating: 0,
			owner: randomString(),
			assignedBy: "admin",
			assignedOn: new Date(),
		});
	}
	return dummy;
};

const ReviewRequests = () => {
	const user = useAppSelector((state) => state.user);
	const [review, setReview] = useState<IGiveReview>(emptyReview);
	const reviews = useAppSelector((state) => state.reviewRequests);

	const [reviewDialog, setReviewDialog] = useState(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const dummyReviews = dummyData();
		dispatch(addReviews(dummyReviews));
	}, []);

	const giveReview = (review: IGiveReview) => {
		setReview(review);
		setReviewDialog(true);
	};

	const hideReviewDialog = () => {
		setReviewDialog(false);
	};

	const handleSubmit = (review: IGiveReview) => {
		// if new review, add
		// if existing review, update
		review.reviewedBy = user.username;
		dispatch(addReview(review));
	};

	return (
		<Main>
			<div>
				{/* employee form */}
				<FlexHorizontal>
					<h3>Give reviews</h3>
				</FlexHorizontal>
				<div
					className="card"
					style={{ height: "calc(100vh - 250px)", overflow: "scroll" }}
				>
					<table>
						<thead>
							<tr>
								<td>Username</td>
								<td>Assigned by</td>
								<td>Assign on</td>
								<td>Actions</td>
							</tr>
						</thead>
						<tbody>
							{reviews.map((review, index) => (
								<tr key={review.id + index}>
									<td>{review.owner}</td>
									<td>{review.assignedBy}</td>
									<td>{review.assignedOn.toDateString()}</td>
									<td>
										<Button
											// className="p-button-round p-button-outlined p-button-primary"
											aria-label="Give review"
											label="Review"
											size="small"
											onClick={() => giveReview(review)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<ReviewDialogForm
					isOpen={reviewDialog}
					review={review}
					onSubmitted={handleSubmit}
					onHide={hideReviewDialog}
				/>
			</div>
		</Main>
	);
};

export default ReviewRequests;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

type IReviewFormProps = {
	review: IGiveReview;
	isOpen: boolean;
	onSubmitted: (review: IGiveReview) => void;
	onHide: () => void;
};

const marginB16px = { marginBottom: "16px" };

const ReviewDialogForm = (props: IReviewFormProps) => {
	const { isOpen, onSubmitted, onHide } = props;
	const [review, setReview] = useState(props.review);

	// listens to change in review
	useEffect(() => {
		setReview(props.review);
	}, [props.review]);

	const handleSubmit = (event: any) => {
		event.preventDefault();
		onSubmitted(review);
		reset();
	};

	const reset = () => {
		setReview(emptyReview);
		onHide();
	};

	return (
		<Dialog
			visible={isOpen}
			style={{ width: "450px" }}
			header="Review"
			modal
			onHide={reset}
		>
			<Form>
				<Rating
					value={review.rating}
					onChange={(e) => setReview({ ...review, rating: e.value })}
					style={marginB16px}
				/>
				<InputTextarea
					value={review.comments}
					onChange={(e) => setReview({ ...review, comments: e.target.value })}
					rows={5}
					cols={30}
					style={marginB16px}
				/>
				<FlexRowReverse>
					<Button
						label="Submit"
						onClick={handleSubmit}
						disabled={[null, 0].includes(review.rating)}
						type="submit"
					/>
					<Button
						label="Cancel"
						className="p-button-outlined"
						onClick={reset}
						type="button"
						style={{ marginRight: "16px" }}
					/>
				</FlexRowReverse>
			</Form>
		</Dialog>
	);
};