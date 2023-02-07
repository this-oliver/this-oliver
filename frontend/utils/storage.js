export default {
	setStorage (key, value) {
		if (process.browser === false) { return; }

		try {
			// set new cache
			const parsedValue = JSON.stringify(value);
			localStorage.setItem(key, parsedValue);
			return true;
		} catch (error) {
			return null;
		}
	},

	getStorage (key) {
		if (process.browser === false) { return; }

		try {
			const value = JSON.parse(localStorage.getItem(key));
			if (value === null || value === undefined) {
				return null;
			} else {
				return value;
			}
		} catch (error) {
			return null;
		}
	},

	removeStorage (key) {
		if (process.browser === false) { return; }

		try {
			localStorage.removeItem(key);
			return true;
		} catch (error) {
			return null;
		}
	}
};

