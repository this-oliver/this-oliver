<template>
	<v-footer
		app
		absolute
		color="transparent"
		class="rounded-t-lg py-2 px-2">
		<v-row :class="`px-2 ${isScreenDesktop ? 'text-center' : ''}`">
			<v-col cols="12">
				<v-divider class="mb-1" />
			</v-col>
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
				cols="12"
				sm="auto"
				class="ml-auto">
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
