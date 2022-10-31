<template>
	<v-card
		:elevation="elevation"
		:class="noPadding ? 'pa-2' : ''">
		<v-card-title>
			<slot name="title">
				{{ title }}
			</slot>
		</v-card-title>

		<v-card-text>
			<slot />
		</v-card-text>

		<v-card-actions>
			<slot name="actions" />
		</v-card-actions>

		<slot name="footer" />
	</v-card>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: null
		},
		elevation: {
			type: Number,
			default: 1
		},
		noPadding: {
			type: Boolean,
			default: false
		}
	}
};
</script>
