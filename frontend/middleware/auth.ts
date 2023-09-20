import { useAuthStore } from '~/stores/auth-store';

export default defineNuxtRouteMiddleware((to) => {
	const authStore = useAuthStore();
	const { notify } = useNotification();

	if (!authStore.isLoggedIn && to.path !== '/login') {
		notify('Opps', 'This is awkward', 'error');
		return navigateTo(`/error?title=Oops&message=Looks like you hit a dead end?&redirect=${to.path}`);
	}
});
