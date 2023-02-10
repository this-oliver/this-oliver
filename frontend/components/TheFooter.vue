<template>
	<v-footer
		app
		padless
		:color="isDarkMode ? 'dark' : 'white'"
		class="rounded-t-lg py-2 px-2">
		<v-row class="px-2">
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
				class="ml-auto text-center">
				<span v-if="hasVisited">👋</span>
				<span v-else>🤠</span>
				<a
					href="https://github.com/this-oliver/this-oliver"
					target="_blank"
					class="simple-link">
					Oliver
					<small>
						&copy; 2020 - {{ new Date().getFullYear() }}
					</small>
				</a>
			</v-col>
		</v-row>
	</v-footer>
</template>

<script>
import { STORAGE } from "~/logic/enums";
import StorageUtil from "../utils/storage";
export default {
	name: "TheFooter",
	computed: {
		getFooterItems () {
			return [
				{
					title: "Github",
					src: null,
					link: "https://github.com/this-oliver"
				},
				{
					title: "Twitter",
					src: null,
					link: "https://twitter.com/maybeolivier"
				}
				/*{
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
			const hasVisited = StorageUtil.getStorage(STORAGE.visitor);

			if (hasVisited) {
				return true;
			} else {
				return false;
			}
		}
	}
};
</script>
