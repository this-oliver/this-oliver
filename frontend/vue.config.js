module.exports = {
	chainWebpack: (config) => {
		config.module
			.rule("vue")
			.use("vue-loader")
			.loader("vue-loader")
			.tap((options) => {
				options.transformAssetUrls = {
					img: "src",
					image: "xlink:href",
					"b-avatar": "src",
					"b-img": "src",
					"b-img-lazy": ["src", "blank-src"],
					"b-card": "img-src",
					"b-card-img": "src",
					"b-card-img-lazy": ["src", "blank-src"],
					"b-carousel-slide": "img-src",
					"b-embed": "src",
				};

				return options;
			});
		config.plugin("html").tap((args) => {
			args[0].title = "Fetch";
			return args;
		});
	},

	devServer: {
		proxy: {
			"/api": {
				target: process.env.VUE_APP_API,
				secure: false,
				changeOrigin: true,
			},
		},
	},

	pluginOptions: {
		i18n: {
			locale: "en",
			fallbackLocale: "en",
			localeDir: "locales",
			enableInSFC: true,
		},
	},
};
