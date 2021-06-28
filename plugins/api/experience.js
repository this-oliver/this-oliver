export default $axios => ({
	async post (
		id,
		title,
		org,
		startYear,
		endYear,
		description,
		type,
		token
	) {
		try {
			const response = await $axios.post(
				`/users/${id}/experiences`,
				{
					title,
					org,
					startYear,
					endYear,
					description,
					type
				},
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
	async patch (
		id,
		title,
		org,
		startYear,
		endYear,
		description,
		type,
		token
	) {
		try {
			const response = await $axios.patch(
				`/experiences/${id}`,
				{
					title,
					org,
					startYear,
					endYear,
					description,
					type
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			if (response.status === 200) {
				return response;
			} else {
				throw response;
			}
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async delete (id, token) {
		try {
			const response = await $axios.delete(`/experiences/${id}`, {
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
