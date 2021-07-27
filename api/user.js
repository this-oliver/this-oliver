export default $axios => ({
	async get () {
		const response = await $axios.get("/user");
		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},

	async patch (id, name, email, shortBio, longBio, token) {
		const response = await $axios.patch(`/user/${id}`, {
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
