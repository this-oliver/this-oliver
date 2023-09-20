import { useTheme as useVuetifyTheme } from 'vuetify/lib/framework.mjs';

const LOCAL_THEME_KEY = 'theme-dark';

export function useTheme () {
	const storage = useStorage();
	const vuetifyTheme = useVuetifyTheme();

	const isDark = ref<boolean>(vuetifyTheme.global.name.value === 'dark');

	const dark = computed<boolean>(() => {
		return vuetifyTheme.global.name.value === 'dark';
	});

	function setDarkTheme (value: boolean) {
		isDark.value = value;
		storage.set(LOCAL_THEME_KEY, value);
	}

	function toggleTheme () {
		setDarkTheme(!isDark.value);
	}

	watch(isDark, (value) => {
		// manually set theme to vuetify
		vuetifyTheme.global.name.value = value ? 'dark' : 'light';
	});

	onMounted(() => {
		// check if theme is set in local storage
		const isDarkTheme = storage.get(LOCAL_THEME_KEY);

		if (isDarkTheme !== null && isDarkTheme !== undefined) {
			setDarkTheme(isDarkTheme);
		} else {
			const deviceDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
			setDarkTheme(deviceDarkMode);
		}
	});

	return {
		dark,
		setDarkTheme,
		toggleTheme
	};
}
