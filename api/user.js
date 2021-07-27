export default $axios => ({
	async get (id) {
		const response = await $axios.get(`/users/${id}`);
		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async index () {
		const response = await $axios.get("/users");
		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async patch (id, name, email, shortBio, longBio, token) {
		const response = await $axios.patch(`/users/${id}`, {
			name,
			email,
			bio: { short: shortBio, long: longBio }
		}, { headers: { Authorization: `Bearer ${token}` } });

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	}
});
