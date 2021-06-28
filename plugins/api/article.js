export default $axios => ({
	async post (token, userId, title, content, tags, publish) {
		try {
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
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async getAll () {
		try {
			const response = await $axios.get("/articles");
			if (response.status === 200) {
				return response;
			} else {
				throw response;
			}
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async getSingle (id) {
		try {
			const response = await $axios.get(`/articles/${id}`);
			if (response.status === 200) {
				return response;
			} else {
				throw response;
			}
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async getUserArticles (id) {
		try {
			const response = await $axios.get(`/users/${id}/articles`);
			if (response.status === 200) {
				return response;
			} else {
				throw response;
			}
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async getSecretArticle (id, token) {
		try {
			const response = await $axios.get(`/secret-articles/${id}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			if (response.status === 200) {
				return response;
			} else {
				throw response;
			}
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async getSecretUserArticles (id, token) {
		try {
			const response = await $axios.get(`/users/${id}/secret-articles`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			if (response.status === 200) {
				return response;
			} else {
				throw response;
			}
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async patch (token, id, patch) {
		try {
			const response = await $axios.patch(`/articles/${id}`, patch, {
				headers: { Authorization: `Bearer ${token}` }
			});
			if (response.status === 200) {
				return response;
			} else {
				throw response;
			}
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async delete (token, id) {
		try {
			const response = await $axios.delete(`/articles/${id}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			if (response.status === 203) {
				return response;
			} else {
				throw response;
			}
		} catch (error) {
			return Promise.reject(error);
		}
	}
});
