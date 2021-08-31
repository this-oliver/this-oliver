export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: "static",

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "Oliver Manzi",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "A software engineering and entreprenurial portfolio." }
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

	// Global routing middlewares to run for every route change
	router: {
		middleware: "sidebar"
	},

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
		// https://auth.nuxtjs.org
		"@nuxtjs/auth-next",
		// https://go.nuxtjs.dev/pwa
		"@nuxtjs/pwa"
	],

	auth: {
		redirect: {
			login: "/auth/login",
			logout: "/auth/login"
		},
		strategies: {
			local: {
				token: {
					property: "token",
					global: true
				},
				user: {
					property: false
				},
				endpoints: {
					login: { url: "/auth/login", method: "post" },
					user: { url: "/admin", method: "get" },
					logout: false
				}
			}
		}
	},

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		baseURL: `${process.env.VUE_APP_API}/api` // Used as fallback if no runtime config is provided
	},

	publicRuntimeConfig: {
		axios: {
			browserBaseURL: `${process.env.VUE_APP_API}/api`
		}
	},

	privateRuntimeConfig: {
		VUE_APP_JWT_SECRET: process.env.VUE_APP_JWT_SECRET
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
