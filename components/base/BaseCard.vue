<template>
	<div>
		<div class="py-1 px-3">
			<slot name="header" />
		</div>

		<div
			:class="path ? 'clickable' : ''"
			@click="goToPath">
			<v-card
				class="py-2 px-3 rounded-lg"
				:outlined="outlined"
				:elevation="elevation">
				<slot name="title" />
				<slot />
			</v-card>
		</div>

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
		},
		outlined: {
			type: Boolean,
			default: true
		},
		elevation: {
			type: Number,
			default: 0
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
