<template>
	<div>
		<b-row align-h="center" class="mt-3">
			<b-col sm="11" md="8">
				<about-me :short="getShortBio" :long="getLongBio" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import AboutMe from "~/components/about/AboutMe.vue";

	export default {
		name: "Landing",
		components: {
			AboutMe
		},
		async asyncData ({ store }) {
			await store.dispatch("user/initUser");
		},
		computed: {
			...mapGetters({
				user: "user/getUser"
			}),
			getShortBio () {
				return (this.user) ? this.user.bio.short : null;
			},
			getLongBio () {
				return (this.user) ? this.user.bio.long : null;
			}
		}
	};
</script>
