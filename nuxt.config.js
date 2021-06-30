export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: true,

	// Target: https://go.nuxtjs.dev/config-target
	target: "server",

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "oliver manzi",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "" }
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		"~/assets/css/app.css",
		"~/assets/css/fonts.css",
		"~/assets/css/themes.css"
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: "~/plugins/api" },
		{ src: "~/plugins/mixin" },
		{ src: "~/plugins/error" }
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		"@nuxtjs/eslint-module",
		// https://github.com/nuxt-community/moment-module
		"@nuxtjs/moment"
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/bootstrap
		"bootstrap-vue/nuxt",
		// https://go.nuxtjs.dev/axios
		"@nuxtjs/axios",
		// https://go.nuxtjs.dev/pwa
		"@nuxtjs/pwa"
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		baseURL: process.env.VUE_APP_API_URL // Used as fallback if no runtime config is provided
	},

	publicRuntimeConfig: {
		axios: {
			browserBaseURL: process.env.VUE_APP_API_URL
		}
	},

	privateRuntimeConfig: {
		axios: {
			baseURL: process.env.VUE_APP_API_URL
		}
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: "en"
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {}
};
