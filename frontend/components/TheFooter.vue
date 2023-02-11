<template>
	<v-footer
		app
		absolute
		color="transparent"
		class="rounded-t-lg py-2 px-2"
		style="margin-top: 5vh;">
		<v-row :class="`px-2 ${isScreenDesktop ? 'text-center' : ''}`">
			<v-col
				v-for="item in getFooterItems"
				:key="item.link"
				cols="12"
				md="auto">
				<a
					class="simple-link mx-2"
					:href="item.link"
					target="_blank">
					{{ item.title }}
				</a>
			</v-col>
			<v-col
				cols="auto"
				class="ml-md-auto">
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
