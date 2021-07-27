export default $axios => ({
	async get () {
		const response = await $axios.get("/admin");
		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},

	async getArticle (id, token) {
		const response = await $axios.get(`/admin/articles/${id}`, {
			headers: { Authorization: `Bearer ${token}` }
		});

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},

	async indexArticles (id, token) {
		const response = await $axios.get("/admin/articles", {
			headers: { Authorization: `Bearer ${token}` }
		});

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},

	async patch (id, name, email, shortBio, longBio, token) {
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
