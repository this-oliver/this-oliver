/**
 * This middleware closes the sidebar whenever the route is changed.
 */
export default function ({ store }) {
	const sidebarOpen = store.getters["app/nav/showSidebar"];
	if (sidebarOpen) {
		store.commit("app/nav/setSidebar", false);
	}
}
