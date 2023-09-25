/**
 * we have to prepend '/' to each path.
 * Otherwise wouter won't recognize it.
 * This is ugly */
export enum Path {
	LOGIN = "/login",
	HOME = "/",
	EMPLOYEES = "/employees",
	EMPLOYEE = "/employees/:id",
}
