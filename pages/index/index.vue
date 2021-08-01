<template>
	<div>
		<b-row align-h="center" class="mt-3">
			<b-col sm="11" md="10">
				<about-me :short="getShortBio" :long="getLongBio" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import AboutMe from "~/components/about/AboutMe.vue";

	export default {
		name: "About",
		components: {
			AboutMe
		},
		computed: {
			...mapGetters({
				oliver: "user/getUser"
			}),
			getShortBio () {
				return (this.oliver) ? this.oliver.bio.short : null;
			},
			getLongBio () {
				return (this.oliver) ? this.oliver.bio.long : null;
			}
		}
	};
</script>
