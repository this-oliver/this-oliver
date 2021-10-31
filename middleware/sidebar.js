/**
 * This middleware closes the sidebar whenever the route is changed.
 */
export default function ({ store }) {
	const sidebarOpen = store.getters["base/nav/showSidebar"];
	if (sidebarOpen) {
		store.commit("base/nav/setSidebar", false);
	}
}
