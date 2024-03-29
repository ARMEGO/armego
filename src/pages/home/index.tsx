import { useState, useEffect, useCallback } from "react";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { Dialog } from "../../components";
import { Link } from "wouter";
import { styled } from "styled-components";
import { IEmployee } from "../../entity/employee";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
	addEmployee,
	addEmployees,
	removeEmployee,
	updateEmployee,
} from "../../store/employeesSlice";
import { deleteById, endpoint, getData, insertData } from "../../api";

const Main = styled.main`
    padding: 16px;
`;

// common margin object
const marginR16px = { marginRight: "16px" };

const emptyEmployee = {
	id: "",
	username: "",
	reviews: 0,
	rating: 0,
};

/**
 * List emplyees. Has option to add, update, remove employee.
 * @returns admin landing page
 */
function Home() {
	const employees = useAppSelector((state) => state.employees);
	const [employee, setEmployee] = useState<IEmployee>(emptyEmployee);
	const [deleteEmployeeDialog, setDeleteEmployeeDialog] = useState(false);
	const dispatch = useAppDispatch();

	// get lsit of employees from API
	const fetchEmployees = useCallback(async () => {
		const response: IEmployee[] = await getData(endpoint.employees);
		dispatch(addEmployees(response));
	}, []);

	useEffect(() => {
		fetchEmployees();
	}, [fetchEmployees]);

	const hideDeleteEmployeeDialog = () => {
		setDeleteEmployeeDialog(false);
	};

	const editEmployee = (employee: IEmployee) => {
		setEmployee(employee);
	};

	const deleteEmployee = (employee: IEmployee) => {
		setEmployee(employee);
		setDeleteEmployeeDialog(true);
	};

	const confirmDeleteEmployee = async () => {
		//  reomve from array
		const response = await deleteById(endpoint.employees, employee.id);
		if (response !== null) {
			dispatch(removeEmployee(employee.id));
			setDeleteEmployeeDialog(false);
		}
		// TODO: display useful message from response
	};

	const handleSubmit = async (employee: IEmployee) => {
		// if new employee, add
		if (employee.id === "") {
			const response = await insertData(endpoint.employees, employee);
			dispatch(addEmployee(employee));
		} // else existing employee, update
		else dispatch(updateEmployee(employee));
	};

	return (
		<Main>
			<div>
				{/* employee form */}
				<EmployeeForm employee={employee} onSubmitted={handleSubmit} />
				<div
					className="card"
					style={{ height: "calc(100vh - 250px)", overflow: "scroll" }}
				>
					<table>
						<thead>
							<tr>
								<td>Username</td>
								<td>Rating</td>
								<td>Reviews</td>
								<td>Actions</td>
							</tr>
						</thead>
						<tbody>
							{employees.map((emp, index) => (
								<tr key={emp.id + index}>
									<td>
										<Link href={`employees/${emp.id.trim()}}`}>
											{emp.username}
										</Link>
									</td>
									<td>
										<Rating
											value={emp.rating}
											readOnly
											stars={5}
											cancel={false}
										/>
									</td>
									<td>{emp.reviews}</td>
									<td>
										<Button
											icon="pi pi-pencil"
											className="p-button-rounded p-button-text "
											aria-label="Delete"
											onClick={() => editEmployee(emp)}
										/>
										<Button
											icon="pi pi-trash"
											className="p-button-rounded p-button-text p-button-secondary"
											aria-label="Delete"
											onClick={() => deleteEmployee(emp)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<Dialog
					isOpen={deleteEmployeeDialog}
					headerLabel="Confirm"
					onClickYes={confirmDeleteEmployee}
					onClickNo={hideDeleteEmployeeDialog}
				>
					<div className="confirmation-content">
						<i
							className="pi pi-exclamation-triangle mr-3"
							style={{ fontSize: "2rem" }}
						/>
						<span>Are you sure you want to delete {employee.username}?</span>
					</div>
				</Dialog>
			</div>
		</Main>
	);
}

export default Home;

const FormContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid #ddd;
	padding: 8px 16px;
	margin-bottom: 16px;
`;

const Form = styled.form`
	display: flex;
	align-items: center;
`;

type IEmployeeFormProps = {
	employee: IEmployee;
	onSubmitted: (employee: IEmployee) => void;
};

const EmployeeForm = (props: IEmployeeFormProps) => {
	const [employee, setEmployee] = useState(props.employee);
	const btnLabel = employee.id ? "Update" : "Add";
	const isBtnDisabled = employee.username.trim() === "";

	// listens to change in employee
	useEffect(() => {
		setEmployee(props.employee);
	}, [props.employee]);

	const handleSubmit = (event: any) => {
		event.preventDefault();
		props.onSubmitted(employee);
		reset();
	};

	const reset = () => {
		setEmployee(emptyEmployee);
	};

	return (
		<FormContainer>
			<h3>Manage employess</h3>
			<Form onSubmit={handleSubmit}>
				<InputText
					value={employee.username}
					autoFocus
					onChange={(e) =>
						setEmployee({ ...employee, username: e.target.value })
					}
					placeholder="Enter username"
					style={{ ...marginR16px }}
				/>
				<Button
					label={btnLabel}
					className="p-button-rounded"
					size="small"
					disabled={isBtnDisabled}
					type="submit"
					style={{ ...marginR16px }}
				/>
				<Button
					label="Reset"
					className="p-button-rounded p-button-outlined"
					size="small"
					onClick={reset}
					disabled={isBtnDisabled}
				/>
			</Form>
		</FormContainer>
	);
};
