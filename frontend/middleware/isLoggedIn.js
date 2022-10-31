export default function ({ $auth, redirect }) {
	if ($auth.isLoggedIn) {
		return redirect("/admin");
	}
}
