export function useRouterQuery () {
	const route = useRoute();
	const router = useRouter();

	async function add (key: string, value: string): Promise<void> {
		const query = { ...route.query, [key]: value };
		await router.replace({ query: { ...query } });
	}

	async function remove (key: string): Promise<void> {
		const query = { ...route.query };
		delete query[key];
		await router.replace({ query });
	}

	function has (key: string): boolean {
		return Object.keys(route.query).includes(key);
	}

	function get (key: string): string {
		return route.query[key] as string;
	}

	return { add, remove, has, get };
}
