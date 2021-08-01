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
	import { getTextDescription } from "~/utils/string";

	export default {
		name: "About",
		components: {
			AboutMe
		},
		head () {
			return {
				title: "About Me",
				meta: [
					{ charset: "utf-8" },
					{ name: "viewport", content: "width=device-width, initial-scale=1" },
					{ hid: "description", name: "description", content: `${getTextDescription(this.getShortBio)}...` }
				],
				link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
			};
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
