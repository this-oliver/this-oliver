import axios from "axios";
import {config as Config} from "../../helpers/token-helper";

export let login = async (email, password) => {
	let data = { email: email, password: password };
	try {
		let response = await axios.post("/auth/login", data);
		if (response.status == 200) return Promise.resolve(response);
		return Promise.reject(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

export let patchPassword = async (oldPassword, newPassword, token) => {
	let data = { oldPassword: oldPassword, newPassword: newPassword };
	try {
		let response = await axios.patch("/auth/password", data, Config(token));
		if (response.status == 200) return Promise.resolve(response);
		return Promise.reject(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

