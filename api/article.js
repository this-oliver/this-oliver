export default $axios => ({
	async post (token, title, content, tags, publish) {
		const response = await $axios.post("/articles", { title, content, tags, publish }, { headers: { Authorization: `Bearer ${token}` } });

		if (response.status === 201) {
			return response;
		} else {
			throw response;
		}
	},
	async get (token, id) {
		const response = token ? await $axios.get(`/admin/articles/${id}`, {
			headers: { Authorization: `Bearer ${token}` }
		}) : await $axios.get(`/articles/${id}`);

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async index (token) {
		const response = token ? await $axios.get("/admin/articles", {
			headers: { Authorization: `Bearer ${token}` }
		}) : await $axios.get("/articles");

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async indexTags(token){
		const response = token ? await $axios.get("/admin/tags", {
			headers: { Authorization: `Bearer ${token}` }
		}) : await $axios.get("/tags");

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async indexArticlesByTag(token, id){
		const response = token ? await $axios.get(`/admin/tags/${id}/articles`, {
			headers: { Authorization: `Bearer ${token}` }
		}) : await $axios.get(`/tags/${id}/articles`);

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
	async incrementViews (id) {
		const response = await $axios.patch(`/articles/${id}/views`);

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async incrementLikes (id) {
		const response = await $axios.patch(`/articles/${id}/likes`);

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
