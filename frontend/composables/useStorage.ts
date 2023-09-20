export function useStorage () {
	function get (key: string) {
		if (process.client === false) { return; }

		const value = localStorage.getItem(key);

		if (value) {
			return JSON.parse(value);
		}

		return null;
	}

	function set (key: string, value: any) {
		if (process.client === false) { return; }

		localStorage.setItem(key, JSON.stringify(value));
	}

	function remove (key: string) {
		if (process.client === false) { return; }

		localStorage.removeItem(key);
	}

	return {
		get,
		set,
		remove
	};
}
