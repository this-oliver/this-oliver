<template>
	<div :id="getTheme" class="app-container">
		<the-navbar />
		<nuxt />
		<the-footer />
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import { getCurrentYear } from "../middleware/time";
	import TheFooter from "../components/base/TheFooter.vue";
	import TheNavbar from "../components/base/TheNavbar.vue";

	export default {
		name: "App",
		components: { TheNavbar, TheFooter },
		data () {
			return {
				loading: false,
				showOlivier: false
			};
		},
		computed: {
			...mapGetters({
				user: "user/getUser",
				loginStatus: "auth/getLoginStatus"
			}),
			getName () {
				const user = this.user;
				return (user) ? user.name : "Oliver Manzi";
			},
			getStyle () {
				return `${this.getTheme} container`;
			},
			getYear () {
				return `2020 - ${getCurrentYear()}`;
			}
		},
		async created () {
			this.loading = true;
			(this.loginStatus) ? await this.initAdmin() : await this.initUser();
			this.loading = false;
		},
		methods: {
			...mapActions({
				initAdmin: "user/initAdmin",
				initUser: "user/initUser",
				logout: "auth/logout"
			})
		}
	};
</script>
