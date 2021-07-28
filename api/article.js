export default $axios => ({
	async post (token, title, content, tags, publish) {
		const response = await $axios.post("/articles", { title, content, tags, publish }, { headers: { Authorization: `Bearer ${token}` } });

		if (response.status === 201) {
			return response;
		} else {
			throw response;
		}
	},
	async get (id) {
		const response = await $axios.get(`/articles/${id}`);

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async index () {
		const response = await $axios.get("/articles");

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async indexUser (id) {
		const response = await $axios.get(`/user/${id}/articles`);

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async patch (token, id, patch) {
		const response = await $axios.patch(`/articles/${id}`, patch, {
			headers: { Authorization: `Bearer ${token}` }
		});

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async delete (token, id) {
		const response = await $axios.delete(`/articles/${id}`, {
			headers: { Authorization: `Bearer ${token}` }
		});

		if (response.status === 203) {
			return response;
		} else {
			throw response;
		}
	}
});
