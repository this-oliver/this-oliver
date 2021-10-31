<template>
	<div class="pa-2">
		<v-card class="pa-2">
			<div
				:class="path ? 'clickable' : ''"
				@click="goToPath">
				<!-- header slot -->
				<slot name="header" />
			</div>

			<!-- default slot -->
			<slot />
		</v-card>

		<!-- footer slot -->
		<div class="mt-2">
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
