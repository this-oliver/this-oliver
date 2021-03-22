import axios from "axios";
import { config as Config } from "../../helpers/token-helper";

export let getUser = async (id, token) => {
	try {
		let response = await axios.get(`/users/${id}`, Config(token));
		if (response.status == 200) return Promise.resolve(response);
		return Promise.reject(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

export let patchUser = async (name, email, shortBio, longBio, token) => {
	let data = {
		name: name,
		email: email,
		bio: { short: shortBio, long: longBio }
	};

	try {
		let response = await axios.patch("/oliver", data, Config(token));
		if (response.status == 200) return Promise.resolve(response);
		return Promise.reject(response);
	} catch (error) {
		return Promise.reject(error);
	}
};
