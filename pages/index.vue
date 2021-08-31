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
	import AboutMe from "~/components/about/AboutMe.vue";
	import { STORAGE } from "~/logic/enums";
	import { getTextDescription } from "~/utils/string";

	export default {
		components: {
			AboutMe
		},
		async asyncData ({ store, $auth }) {
			// check if client has visited website before
			const hasVisited = $auth.$storage.getUniversal(STORAGE.visitor);

			// if user has never visited page
			if (!hasVisited) {
				try {
					// increment visit count
					await store.dispatch("user/incrementVisits");
					// place a cookie on user device
					$auth.$storage.setUniversal(STORAGE.visitor, STORAGE.visitor);
				} catch (error) {
				}
			}

			// retreive oliver
			const oliver = await store.dispatch("user/initUser");

			// return oliver
			return { oliver };
		},
		head () {
			return {
				meta: [
					{ charset: "utf-8" },
					{ name: "viewport", content: "width=device-width, initial-scale=1" },
					{ hid: "description", name: "description", content: `${getTextDescription(this.getShortBio)}...` }
				],
				link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
			};
		},
		computed: {
			getShortBio () {
				return (this.oliver) ? this.oliver.bio.short : "My name is Oliver and I'm a software engineer. I'm studying information security. My interests are coding, entrepreneurship and blockchain technology.";
			},
			getLongBio () {
				return (this.oliver) ? this.oliver.bio.long : "My name is Oliver and I'm a coder with a software engineering background (BSc) that is currently studying information security (Msc) because I think it's interesting. I have worked at large enterprises and small startups.";
			}
		}
	};
</script>
