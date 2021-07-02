export default async function ({ store, redirect }) {
	const authenticated = await store.dispatch("auth/authenticate");

	if (authenticated === false) {
		// client shall not pass
		return redirect("/auth/login");
	}
}
