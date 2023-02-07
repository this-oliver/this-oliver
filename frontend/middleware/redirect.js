/**
 * This middleware redirects the user to the login page
 * if the route is 'admin' and the user is not logged in
 */
export default function ({ store, route, redirect }) {
	if (!store.state.auth.loggedIn && route.path.includes("/admin")) {
		redirect("/auth/login");
	}
}
