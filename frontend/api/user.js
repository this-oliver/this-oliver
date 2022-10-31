export default $axios => ({
	async get () {
		const response = await $axios.get("/user");
		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async incrementVisits () {
		const response = await $axios.patch("/user/visits");
		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async patch (token, id, name, email, shortBio, longBio) {
		const response = await $axios.patch("/admin", {
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
