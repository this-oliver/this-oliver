<template>
	<div id="footer">
		<div class="footer-list">
			<div v-for="item in getFooterItems" :key="item.link" class="footer-item">
				<a :href="item.link" target="_blank">
					<b-img-lazy :src="item.src" width="25" alt="item.title" />
				</a>
			</div>
		</div>
		<div class="footer-copyright">
			<small class="bold-text">
				<nuxt-link to="/admin">
					🤠
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
	export default {
		name: "TheFooter",
		computed: {
			getFooterItems () {
				return [
					{
						title: "Github",
						src: require("~/assets/icons/github.svg"),
						link: "https://github.com/olivermanzi"
					},
					{
						title: "LinkedIn",
						src: require("~/assets/icons/linkedin.svg"),
						link: "https://www.linkedin.com/in/oliver-manzi/"
					},
					{
						title: "FetchQr",
						src: require("~/assets/icons/fetch.png"),
						link: "https://fetchqr.com"
					}
				];
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

.footer-copyright {
	margin-top: 2.5%;
}
</style>
