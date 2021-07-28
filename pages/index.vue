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
	import AboutMe from "~/components/about/AboutMe.vue";

	export default {
		name: "Landing",
		components: {
			AboutMe
		},
		async asyncData ({ store }) {
			const oliver = await store.dispatch("user/initUser");
			return { oliver };
		},
		computed: {
			getShortBio () {
				return (this.oliver) ? this.oliver.bio.short : null;
			},
			getLongBio () {
				return (this.oliver) ? this.oliver.bio.long : null;
			}
		}
	};
</script>
