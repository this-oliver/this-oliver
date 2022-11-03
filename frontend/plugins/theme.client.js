export default function ({ store }) {
	// Only available on the Client-side
	if (process.client) {
		// check system preference
		const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
		// set system preference
		store.commit("app/theme/setDarkMode", darkMode);
	}
}
