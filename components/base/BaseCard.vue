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
				<div>
					<slot />
				</div>
			</div>
		</b-card>

		<!-- footer slot -->
		<b-row class="mt-2">
			<b-col cols="12">
				<slot name="footer" />
			</b-col>
		</b-row>
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
