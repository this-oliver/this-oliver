import axios from "axios";
import { config as Config } from "../../helpers/token-helper";

export let postExperience = async (
	title,
	org,
	startYear,
	endYear,
	description,
	type,
	token
) => {
	let data = {
		title: title,
		org: org,
		startYear: startYear,
		endYear: endYear,
		description: description,
		type: type
	};

	try {
		let response = await axios.post("experiences", data, Config(token));
		if (response.status == 200) return Promise.resolve(response);
		return Promise.reject(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

export let patchExperience = async (
	id,
	title,
	org,
	startYear,
	endYear,
	description,
	type,
	token
) => {
	let data = {
		title: title,
		org: org,
		startYear: startYear,
		endYear: endYear,
		description: description,
		type: type
	};

	try {
		let response = await axios.patch(`experiences/${id}`, data, Config(token));
		if (response.status == 200) return Promise.resolve(response);
		return Promise.reject(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

export let deleteExperience = async (
	id,
	token
) => {

	try {
		let response = await axios.delete(`experiences/${id}`, Config(token));
		if (response.status == 203) return Promise.resolve(response);
		return Promise.reject(response);
	} catch (error) {
		return Promise.reject(error);
	}
};
