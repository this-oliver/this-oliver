/**
 * This middleware initiates the admin if the
 * user is logged in otherwise it redirects the user
 */
export default function ({ store }) {
	// note: (logged in users are already initialized by @nuxtjs/auth-next plugin)
	if(!store.state.auth.loggedIn){
		store.dispatch("user/init");
	}
}
