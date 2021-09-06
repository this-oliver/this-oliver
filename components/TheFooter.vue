<template>
	<div id="footer">
		<div class="footer-list">
			<div v-for="item in getFooterItems" :key="item.link" class="footer-list-item">
				<a :href="item.link" target="_blank">
					<b-img-lazy class="footer-list-item-img" :src="item.src" width="25" alt="item.title" />
				</a>
			</div>
		</div>
		<div class="footer-copyright">
			<small class="bold-text">
				<nuxt-link to="/admin">
					<span v-if="hasVisited">👋</span>
					<span v-else>🤠</span>
				</nuxt-link>
				Oliver Manzi
				<small>
					&copy; 2020
				</small>
			</small>
		</div>
	</div>
</template>

<script>
	import { STORAGE } from "~/logic/enums";
	export default {
		name: "TheFooter",
		computed: {
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

<style scoped>
#footer {
	display: grid;
	place-items: center;
	column-gap: 1em;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 1fr;
}

.footer-list {
	width: 30%;

	display: grid;
	place-items: center;
	grid-template-rows: 1fr;
	grid-template-columns: repeat(3, 1fr);
}

.footer-list-item {
	background-color: #f8f9fa;

	border-radius: 15%;
	border: #f8f9fa 5px solid;
}

.footer-copyright {
	margin-top: 2.5%;
}
</style>
