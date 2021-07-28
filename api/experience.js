export default $axios => ({
	async post (token,
		title,
		org,
		startYear,
		endYear,
		description,
		type) {
		const response = await $axios.post("/experiences", {
			title,
			org,
			startYear,
			endYear,
			description,
			type
		}, { headers: { Authorization: `Bearer ${token}` } });

		if (response.status === 201) {
			return response;
		} else {
			throw response;
		}
	},
	async patch (token, id,
		title,
		org,
		startYear,
		endYear,
		description,
		type) {
		const response = await $axios.patch(`/experiences/${id}`, {
			title,
			org,
			startYear,
			endYear,
			description,
			type
		}, { headers: { Authorization: `Bearer ${token}` } });

		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	},
	async delete (token, id) {
		const response = await $axios.delete(`/experiences/${id}`, {
			headers: { Authorization: `Bearer ${token}` }
		});

		if (response.status === 203) {
			return response;
		} else {
			throw response;
		}
	}
});
