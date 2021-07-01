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
		computed: {
			...mapGetters({
				user: "user/getUser"
			}),
			getShortBio () {
				return this.user.bio.short;
			},
			getLongBio () {
				return this.user.bio.long;
			}
		}
	};
</script>
