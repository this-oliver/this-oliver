export default $axios => ({
	async post (token, userId, title, content, tags, publish) {
		const response = await $axios.post(
			`/users/${userId}/articles`,
			{ title, content, tags, publish },
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		if (response.status === 201) {
			return response;
		} else {
			throw response;
		}
	},
	async getAll () {
		const response = await $axios.get("/articles");

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async getSingle (id) {
		const response = await $axios.get(`/articles/${id}`);

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async getUserArticles (id) {
		const response = await $axios.get(`/users/${id}/articles`);

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async getSecretArticle (id, token) {
		const response = await $axios.get(`/secret-articles/${id}`, {
			headers: { Authorization: `Bearer ${token}` }
		});

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async getSecretUserArticles (id, token) {
		const response = await $axios.get(`/users/${id}/secret-articles`, {
			headers: { Authorization: `Bearer ${token}` }
		});

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
