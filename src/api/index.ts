import { IEmployee } from "../entity/employee";

const baseUrl = "http://localhost:8080";

export const fetchData = (url: string) =>
	fetch(url).then((response) => response.json());

export const postData = (url: string, payload: object) =>
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	}).then((response) => response.json());

export const getUrl = (endpoint: string) => baseUrl + "/" + endpoint;

export const endpoint = {
	employees: "employees",
	feedback: "feedback",
};

export const insertData = async (endpoint: string, payload: Object) => {
	const response: IEmployee = await postData(`${baseUrl}/${endpoint}`, payload);
	return response;
};

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

export const deleteById = async (endpoint: string, id: string) => {
	const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((response) => response.json());
	return response;
};

export const getData = async (endpoint: string) => {
	const response = await fetchData(`${baseUrl}/${endpoint}`);
	return response;
};

export const getDataById = async (endpoint: string, id: string) => {
	const response = await fetchData(`${baseUrl}/${endpoint}/${id}`);
	return response;
};
