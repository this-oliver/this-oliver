<template>
	<div>
		<b-card :bg-variant="getBootstrapTheme" :border-variant="getOppositeBootstrapTheme" :text-variant="getOppositeBootstrapTheme">
			<div :class="path ? 'clickable' : ''" @click="goToPath">
				<!-- header slot -->
				<b-row>
					<b-col cols="12">
						<slot name="header" />
					</b-col>
				</b-row>

				<!-- default slot -->
				<div class="card-content">
					<slot />
				</div>
			</div>

			<!-- footer slot -->
			<b-row>
				<b-col cols="12">
					<slot name="footer" />
				</b-col>
			</b-row>
		</b-card>
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

<style scoped>
.card-content {
	margin-top: .5em;
	margin-bottom: .5em;
}
</style>
