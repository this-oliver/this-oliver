<template>
	<v-row
		justify="center"
		align="center">
		<v-col
			cols="12"
			md="1"
			order="2"
			order-md="1">
			<slot name="left-side" />
		</v-col>

		<v-col
			cols="12"
			md="10"
			order="1"
			order-md="2"
			:class="path ? 'clickable' : ''"
			@click="goToPath">
			<v-card
				class="py-2 px-3 rounded-lg"
				:outlined="outlined"
				:elevation="elevation">
				<slot name="title" />
				<slot />
			</v-card>
		</v-col>

		<v-col
			cols="12"
			md="1"
			order="3"
			order-md="3">
			<slot name="right-side" />
		</v-col>

		<v-col
			cols="12"
			order="4"
			order-md="4"
			class="mt-1">
			<slot name="footer" />
		</v-col>
	</v-row>
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
