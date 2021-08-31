<template>
	<div>
		<b-row align-h="center">
			<b-col class="mt-3" sm="11" md="8">
				<about-form :edit-mode="true" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import AboutForm from "~/components/about/AboutForm.vue";

	export default {
		name: "AdminPage",
		components: { AboutForm },
		async asyncData ({ store }) {
			await store.dispatch("admin/initUser");
		},
		computed: {
			...mapGetters({
				user: "admin/getUser"
			})
		}
	};
</script>
