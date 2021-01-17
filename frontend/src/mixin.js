/**
 * scrolls view to the top of screen if user enters sub-component
 */
export const scrollToTop = function() {
	window.scrollTo(0, 0);
};

/**
 * directs router to route with specified name
 * @param {String} routeName - route name 
 * @param {Object} vm - vue instance
 */
export const goTo = function(routeName, vm){
	if (vm.$route.name != routeName){
		vm.$router.push({
			name: routeName
		});
	}
};

export const mixin = {
	data: function() {
		return {
			darkTheme: false
		};
	},
	computed: {
		getTheme: function() {
			return this.darkTheme ? "dark-theme" : "light-theme";
		},
		getBootstrapTheme: function() {
			return this.darkTheme ? "dark" : "light";
		},
		getBootstrapInverseTheme: function() {
			return this.darkTheme ? "outline-light" : "outline-dark";
		}
	},
	methods: {
		goTo: goTo,
		toggleTheme: function() {
			this.darkTheme = !this.darkTheme;
		}
	}
};
