export default $axios => ({
	async login (email, password) {
		const response = await $axios.post("/auth/login", {
			email,
			password
		});

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async register (name, email, password, shortBio, longBio) {
		const response = await $axios.post("/auth/register", {
			name,
			email,
			password,
			bio: { short: shortBio, long: longBio }
		});

		if (response.status === 201) {
			return response;
		} else {
			throw response;
		}
	},
	async patchPassword (oldPassword, newPassword, token) {
		const response = await $axios.patch(
			"/auth/password",
			{ oldPassword, newPassword },
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	}
});
