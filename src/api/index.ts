import { IEmployee } from "../entity/employee";

// API base url
const baseUrl = "http://localhost:8080";

/**
 * REST endpoints
 */
export const endpoint = {
	employees: "employees",
	feedback: "feedback",
};

/**
 * customized fetch function
 * @param url
 * @returns response
 */
export const fetchData = (url: string) =>
	fetch(url).then((response) => response.json());

/**
 * Request made using http POST method goes here
 * @param url
 * @param payload
 * @returns null or response
 */
export const postData = (url: string, payload: object) =>
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	}).then((response) => response.json());

/**
 * Concatenate baseUrl and dynamic endpoint
 * @param endpoint
 * @returns string
 */
export const getUrl = (endpoint: string) => baseUrl + "/" + endpoint;

/**
 * Insert new employee
 * @param endpoint
 * @param payload
 * @returns IEmployee
 */
export const insertData = async (endpoint: string, payload: Object) => {
	const response: IEmployee = await postData(`${baseUrl}/${endpoint}`, payload);
	return response;
};

/**
 * Update existing employee
 * @param endpoint
 * @param id
 * @param payload
 * @returns response or null
 */
export const updateDataById = async (
	endpoint: string,
	id: string,
	payload: Object,
) => {
	const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	}).then((response) => response.json());
	return response;
};

/**
 * Delete employee
 * @param endpoint
 * @param id
 * @returns response or null
 */
export const deleteById = async (endpoint: string, id: string) => {
	const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((response) => response.json());
	return response;
};

/**
 * All http GET method uses this
 * @param endpoint
 * @returns response as list
 */
export const getData = async (endpoint: string) => {
	const response = await fetchData(`${baseUrl}/${endpoint}`);
	return response;
};

/**
 * All http method GET by id uses this
 * @param endpoint
 * @param id
 * @returns response or null
 */
export const getDataById = async (endpoint: string, id: string) => {
	const response = await fetchData(`${baseUrl}/${endpoint}/${id}`);
	return response;
};
