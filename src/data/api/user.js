import axios from "axios";
import { config as Config } from "../../helpers/token-helper";

export let getSingleUser = async id => {
	try {
		let response = await axios.get(`/users/${id}`);
		if (response.status == 200) {
			return response;
		} else {
			throw response;
		}
	} catch (error) {
		return Promise.reject(error);
	}
};

export let getAllUsers = async () => {
	try {
		let response = await axios.get("/users");
		if (response.status == 200) {
			return response;
		} else {
			throw response;
		}
	} catch (error) {
		return Promise.reject(error);
	}
};

export let patchUser = async (id, name, email, shortBio, longBio, token) => {
	let data = {
		name: name,
		email: email,
		bio: { short: shortBio, long: longBio }
	};

	try {
		let response = await axios.patch(`/users/${id}`, data, Config(token));
		if (response.status == 200) {
			return response;
		} else {
			throw response;
		}
	} catch (error) {
		return Promise.reject(error);
	}
};
