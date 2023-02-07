/**
 * This middleware initiates the admin if the
 * user is logged in otherwise it redirects the user
 */
export default function ({ store }) {
	if(store.state.auth.loggedIn){
		store.dispatch("admin/init");
	}else{
		store.dispatch("user/init");
	}
}
