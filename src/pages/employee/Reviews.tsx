import { randomString } from "../../common";
import { useState, useEffect, FC, useCallback } from "react";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { styled } from "styled-components";
import { Dialog } from "primereact/dialog";
import { IReview } from "../../entity/review";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectEmployeeById } from "../../store/employeesSlice";
import { InputTextarea } from "primereact/inputtextarea";
import {
	addEmployeeReview,
	addEmployeeReviews,
	updateEmployeeReview,
} from "../../store/employeeReviewsSlice";
import { MultiSelect } from "primereact/multiselect";
import { endpoint, getDataById, insertData, updateDataById } from "../../api";

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

const FlexRowReverseBordered = styled(FlexRowReverse)`
	border-left: 1px solid #ddd;
	padding: 8px 16px;
`;

const emptyReview = {
	id: "",
	rating: 0,
	comments: "",
	reviewedBy: "",
};

const dummyData = () => {
	let dummy = [];
	for (let i = 0; i < 50; i++) {
		dummy.push({
			id: randomString(),
			comments: randomString(),
			reviewedBy: randomString(),
			rating: 1 + i,
		});
	}
	return dummy;
};

type IProps = {
	params: {
		id: string;
	};
};

const Reviews: FC<IProps> = ({ params }) => {
	const id = params.id.split("%")[0];
	const employee = useAppSelector((state) => selectEmployeeById(state, id));
	const employees = useAppSelector((state) =>
		state.employees.filter((emp) => emp.id !== employee?.id),
	);
	const user = useAppSelector((state) => state.user);

	const [selectedEmployees, setSelectedEmployees] = useState([]);
	const [review, setReview] = useState<IReview>(emptyReview);
	const reviews = useAppSelector((state) => state.employeeReviews.reviews);

	const [reviewDialog, setReviewDialog] = useState(false);

	const dispatch = useAppDispatch();

	const fetchReviews = useCallback(async () => {
		const response: IReview[] = await getDataById(
			endpoint.employees,
			employee?.username,
		);
		dispatch(addEmployeeReviews({ employee, reviews: response || [] }));
	}, []);

	useEffect(() => {
		fetchReviews();
	}, [fetchReviews]);

	const hideReviewDialog = () => {
		setReviewDialog(false);
	};

	const editReview = (review: IReview) => {
		setReview(review);
		setReviewDialog(true);
	};

	const handleSubmit = async (review: IReview) => {
		// if new review, add
		// if existing review, update
		review.reviewedBy = user.username;
		if (review.id === "") {
			const response = await insertData(endpoint.feedback, {
				...review,
				owner: employee?.username,
				reviewed_by: user.username,
			});
			console.log(response);

			dispatch(addEmployeeReview(review));
		} else {
			const response = await updateDataById(endpoint.feedback, review.id, {
				...review,
				owner: employee?.username,
				reviewed_by: user.username,
			});
			console.log(response);

			dispatch(updateEmployeeReview(review));
		}
	};

	const askReview = () => {
		console.log(selectedEmployees);
	};

	return (
		<Main>
			<div>
				{/* employee form */}
				<FlexHorizontal>
					<h3>Manage {employee?.username}'s reviews</h3>
					<FlexRowReverse>
						<FlexRowReverseBordered>
							<Button
								label="Ask review"
								size="small"
								onClick={askReview}
								disabled={selectedEmployees.length === 0}
							/>
							<MultiSelect
								value={selectedEmployees}
								options={employees}
								onChange={(e) => setSelectedEmployees(e.value)}
								optionLabel="username"
								placeholder="Select employee(s)"
								maxSelectedLabels={3}
								style={{ marginRight: "8px", width: "220px" }}
							/>
						</FlexRowReverseBordered>
						<Button
							label="Add review"
							className="p-button-rounded"
							size="small"
							onClick={() => editReview(emptyReview)}
							style={{ marginRight: "16px" }}
						/>
					</FlexRowReverse>
				</FlexHorizontal>
				<div
					className="card"
					style={{ height: "calc(100vh - 250px)", overflow: "scroll" }}
				>
					<table>
						<thead>
							<tr>
								<td>Rating</td>
								<td>Comments</td>
								<td>Reviewed by</td>
								<td>Actions</td>
							</tr>
						</thead>
						<tbody>
							{reviews.map((review, index) => (
								<tr key={review.id + index}>
									<td>
										<Rating
											value={review.rating}
											readOnly
											stars={5}
											cancel={false}
										/>
									</td>
									<td>
										<p>{review.comments}</p>
									</td>
									<td>{review.reviewedBy}</td>
									<td>
										<Button
											icon="pi pi-pencil"
											className="p-button-rounded p-button-text "
											aria-label="Delete"
											onClick={() => editReview(review)}
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

export default Reviews;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

type IReviewFormProps = {
	review: IReview;
	isOpen: boolean;
	onSubmitted: (review: IReview) => void;
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
						label="Save"
						icon="pi pi-check"
						onClick={handleSubmit}
						disabled={review.rating === null}
						type="submit"
					/>
					<Button
						label="Cancel"
						className="p-button-outlined"
						onClick={reset}
						style={{ marginRight: "16px" }}
						type="button"
					/>
				</FlexRowReverse>
			</Form>
		</Dialog>
	);
};
