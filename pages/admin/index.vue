<template>
	<div>
		<b-row align-h="center">
			<b-col class="mt-3" sm="11" md="8">
				👀 {{ user.visits }}
			</b-col>
			<b-col class="mt-3" sm="11" md="8">
				<about-me :short="user.bio.short" :long="user.bio.long" :edit-mode="true" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import AboutMe from "~/components/about/AboutMe.vue";

	export default {
		name: "AdminPage",
		components: { AboutMe },
		async asyncData ({ $auth }) {
			await $auth.fetchUser();
		},
		computed: {
			...mapGetters({
				user: "admin/getUser"
			})
		}
	};
</script>
