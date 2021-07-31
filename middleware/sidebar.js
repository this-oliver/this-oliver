/**
 * This middleware closes the sidebar whenever the route is changed.
 */
export default function ({ store }) {
	const sidebarOpen = store.getters["base/nav/isSidebarVisible"];
	if (sidebarOpen) {
		store.commit("base/nav/showSidebar", false);
	}
}
