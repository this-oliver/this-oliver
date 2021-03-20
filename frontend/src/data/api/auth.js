import axios from "axios";

export let login = async (email, password) => {
	var data = { email: email, password: password };
	try {
		let response = await axios.post("/auth/login", data);
		if (response.status == 200) return Promise.resolve(response);
		return Promise.reject(response);
	} catch (error) {
		return Promise.reject(error);
	}
};
