<template>
	<div>
		<v-snackbar
			:value="cookiesAllowed === false"
			app
			bottom
			timeout="-1"
			color="dark">
			<v-row>
				<v-col cols="auto">
					<h2>🍪 Cookies</h2>
				</v-col>
				<v-col cols="auto">
					I'm using cookies to understand where you are from (country) and what kind of device you are using (mobile? pc?). I am not using cookies to sell data to 3rd parties.
				</v-col>
				<v-col>
					<v-btn
						block
						color="success"
						@click="allowCookies(true)">
						okay
					</v-btn>
				</v-col>
			</v-row>
		</v-snackbar>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
	name: "TheCookieToast",
	computed: {
		...mapGetters({
			cookiesAllowed: "app/permissions/cookiesAllowed"
		})
	},
	methods: {
		...mapMutations({
			allowCookies: "app/permissions/allowCookies"
		})
	}
};
</script>
