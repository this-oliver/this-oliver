const metaTitle = "Oliver's Personal Website";
const metaDescription = "A software engineering and entreprenurial portfolio.";
export default {
	// Server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: "static",

	// SPA fallback: https://nuxtjs.org/docs/2.x/deployment/netlify-deployment
	generate: {
		fallback: true
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: metaTitle,
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				hid: "description",
				name: "description",
				content: metaDescription
			},
			// og meta tags
			{
				hid: "og:type",
				property: "og:type",
				content: "website"
			},
			{
				hid: "og:title",
				property: "og:title",
				content: metaTitle
			},
			{
				hid: "og:description",
				property: "og:description",
				content: metaDescription
			},
			{
				hid: "og:image",
				property: "og:image",
				content: "/favicon-32x32.png"
			}
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		"~/assets/css/fonts.css"
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: "~/plugins/api.js" },
		{ src: "~/plugins/error.js" },
		{ src: "~/plugins/mixin.client.js" },
		{ src: "~/plugins/vuetify.client.js" }
	],

	// Global routing middlewares to run for every route change
	router: {
		middleware: ["redirect", "init", "sidebar"]
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
		// https://auth.nuxtjs.org
		"@nuxtjs/auth-next",
		// https://go.nuxtjs.dev/axios
		"@nuxtjs/axios",
		// https://vuetifyjs.com/en/
		"@nuxtjs/vuetify"
	],

	auth: {
		redirect: {
			login: "/auth/login",
			logout: "/"
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

	// env variabes
	env: {
		VUE_APP_JWT_SECRET: process.env.VUE_APP_JWT_SECRET
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
