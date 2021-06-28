export default $axios => ({
	async getSingle (id) {
		try {
			const response = await $axios.get(`/users/${id}`);
			if (response.status === 200) {
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
			const response = await $axios.get("/users");
			if (response.status === 200) {
				return response;
			} else {
				throw response;
			}
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async patch (id, name, email, shortBio, longBio, token) {
		try {
			const response = await $axios.patch(
				`/users/${id}`,
				{
					name,
					email,
					bio: { short: shortBio, long: longBio }
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
	}
});
