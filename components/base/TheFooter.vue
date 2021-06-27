<template>
	<div>
		<b-row
			id="footer"
			class="my-1"
			align-h="center">
			<b-col
				sm="11"
				md="4">
				<b-row align-h="center">
					<b-col
						v-for="item in getFooterItems"
						:key="item.link"
						class="mx-1"
						cols="auto">
						<a
							:href="item.link"
							target="_blank">
							<b-img-lazy
								:src="item.src"
								width="25"
								alt="item.title" />
						</a>
					</b-col>
				</b-row>
			</b-col>

			<b-col
				class="my-1"
				sm="auto"
				md="auto">
				<small class="bold-text">
					<nuxt-link to="/">
						🤠
					</nuxt-link>
					Oliver Manzi
					<small>
						&copy; 2020
					</small>
				</small>
			</b-col>
		</b-row>
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
						src: "https://github.com/simple-icons/simple-icons/blob/develop/icons/github.svg",
						link: "https://github.com/olivermanzi"
					},
					{
						title: "LinkedIn",
						src: "https://github.com/simple-icons/simple-icons/blob/develop/icons/linkedin.svg",
						link: "https://www.linkedin.com/in/oliver-manzi/"
					},
					{
						title: "FetchQr",
						src: "https://github.com/simple-icons/simple-icons/blob/develop/icons/github.svg",
						link: "https://fetchqr.com"
					}
				];
			}
		}
	};
</script>
