import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IEmployee } from "../entity/employee";
import { RootState } from ".";

const initialState: IEmployee[] = [];

export const employeesSlice = createSlice({
	name: "employees",
	initialState,
	reducers: {
		addEmployees: (state, action: PayloadAction<IEmployee[]>) => action.payload,
		addEmployee: (state, action: PayloadAction<IEmployee>) => {
			const employee = action.payload;
			// if new employee, add
			if (employee.id === "") {
				employee.id = (Math.random() + 1).toString(36).substring(7);
				return [employee, ...state];
			} else {
				// existing employee, update
				const newEmplyess = [...state];
				newEmplyess.map((emp) => {
					if (emp.id === employee.id) emp.username = employee.username;
					return emp;
				});
				return newEmplyess;
			}
		},
		updateEmployee: (state, action: PayloadAction<IEmployee>) =>
			state.map((employee: IEmployee) => {
				if (employee.id !== action.payload.id) {
					// This isn't the item we care about - keep it as-is
					return employee;
				}

				// Otherwise, this is the one we want - return an updated value
				return {
					...employee,
					...action.payload,
				};
			}),
		removeEmployee: (state, action: PayloadAction<string>) =>
			state.filter((employee) => employee.id !== action.payload),
	},
});

// Action creators are generated for each case reducer function
export const { addEmployee, updateEmployee, addEmployees, removeEmployee } =
	employeesSlice.actions;

// selector for reviews
export const selectEmployeeById = (state: RootState, id: string) => {
	const employee = state.employees.find((employee) => employee.id === id);
	return employee;
};

export default employeesSlice.reducer;
