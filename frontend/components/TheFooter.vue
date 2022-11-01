<template>
	<v-footer
		app
		padless
		absolute
		:color="showDarkMode ? 'dark' : 'white'"
		class="rounded-t-lg py-2 px-2">
		<v-row
			class="px-2"
			justify="space-between">
			<v-col
				v-for="item in getFooterItems"
				:key="item.link"
				cols="12"
				sm="auto"
				class="text-center">
				<a
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
				Oliver
				<small>
					&copy; 2020 - {{ new Date().getFullYear() }}
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
					link: "https://github.com/this-oliver"
				}
				/*{
					title: "Twitter",
					src: null,
					link: "https://twitter.com/cowboy_pigeons"
				},
				{
					title: "oliverrr.eth",
					src: null,
					link: "https://etherscan.io/address/oliverrr.eth"
				},
				{
					title: "Buy me a coffee",
					src: null,
					link: "https://www.buymeacoffee.com/oliverrr"
				}*/
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
