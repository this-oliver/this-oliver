const BaseUrl = process.env.VUE_APP_API;

if (!BaseUrl) {
	throw new Error("[.env] Env variable 'VUE_APP_API' is undefined.");
}

const Config = {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: true,

	// Target: https://go.nuxtjs.dev/config-target
	target: "static",

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "Oliver Manzi",
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
		{ src: "~/plugins/error" },
		{ src: "~/plugins/mixin" }
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		"@nuxtjs/eslint-module",
		// https://github.com/nuxt-community/moment-module
		"@nuxtjs/moment",
		// https://github.com/nuxt-community/dotenv-module
		"@nuxtjs/dotenv"
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
		baseURL: `${BaseUrl}/api` // Used as fallback if no runtime config is provided
	},

	publicRuntimeConfig: {
		axios: {
			browserBaseURL: `${BaseUrl}/api`
		}
	},

	privateRuntimeConfig: {
		axios: {
			baseURL: `${BaseUrl}/api`
		}
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: "en"
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	// vue configurations
	vue: {
		config: {
			// hides source code from browser
			productionSourceMap: false
		}
	}
};

export default Config;
