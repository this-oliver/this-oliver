<template>
	<v-footer
		app
		padless
		absolute
		:color="showDarkMode ? 'dark' : 'white'"
		class="rounded-t-lg py-2 px-2">
		<v-row
			justify="space-between"
			class="px-2">
			<v-col
				cols="12"
				sm="auto"
				class="text-center">
				<a
					v-for="item in getFooterItems"
					:key="item.link"
					class="simple-link mx-2"
					:href="item.link"
					target="_blank">
					{{ item.title }}
				</a>
			</v-col>
			<v-col
				cols="12"
				sm="auto"
				class="text-center">
				<span v-if="hasVisited">👋</span>
				<span v-else>🤠</span>
				Oliver Manzi
				<small>
					&copy; 2020
				</small>
			</v-col>
		</v-row>
	</v-footer>
</template>

<script>
import { mapGetters } from "vuex";
import { STORAGE } from "~/logic/enums";
export default {
	name: "TheFooter",
	computed: {
		...mapGetters({
			showDarkMode: "app/theme/isDarkMode"
		}),
		getFooterItems () {
			return [
				{
					title: "Github",
					src: "/images/icons/github.svg",
					link: "https://github.com/olivermanzi"
				},
				{
					title: "LinkedIn",
					src: "/images/icons/linkedin.svg",
					link: "https://www.linkedin.com/in/oliver-manzi/"
				},
				{
					title: "FetchQr",
					src: "/images/icons/fetch.png",
					link: "https://fetchqr.com"
				}
			];
		},
		hasVisited () {
			const hasVisited = this.$auth.$storage.getUniversal(STORAGE.visitor);

			if (hasVisited) {
				return true;
			} else {
				return false;
			}
		}
	}
};
</script>
