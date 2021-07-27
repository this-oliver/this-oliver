export default $axios => ({
	async get () {
		const response = await $axios.get("/user");
		if (response.status === 200) {
			return response;
		} else {
			throw response;
		}
	}
});
