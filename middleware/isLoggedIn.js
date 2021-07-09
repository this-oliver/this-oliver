export default async function ({ store, redirect }) {
	const authenticated = await store.dispatch("auth/authenticate");

	if (authenticated === true) {
		return redirect("/admin");
	}
}
