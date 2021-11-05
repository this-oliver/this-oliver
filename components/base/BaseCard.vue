<template>
	<div
		:class="path ? 'clickable' : ''"
		@click="goToPath">
		<v-card class="pa-2">
			<!-- header slot -->
			<slot name="header" />

			<!-- default slot -->
			<slot />
		</v-card>

		<!-- footer slot -->
		<div class="mt-1">
			<slot name="footer" />
		</div>
	</div>
</template>

<script>
export default {
	name: "BaseCard",
	props: {
		path: {
			type: String,
			default: null
		}
	},
	methods: {
		goToPath () {
			if (this.path) {
				this.$router.push(this.path);
			}
		}
	}
};
</script>
