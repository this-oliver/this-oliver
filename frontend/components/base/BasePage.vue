<template>
	<div class="mb-2 pa-2">
		<slot name="title">
			<div class="mt-2 mx-2 text-center base-page-title">
				<h1>{{ title }}</h1>
			</div>
		</slot>

		<div class="my-2">
			<div v-if="noPadding">
				<slot />
			</div>
			<v-row
				v-else
				justify="center">
				<v-col
					cols="11"
					sm="8">
					<slot />
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: undefined
		},
		noPadding: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style scoped>
.base-page-title{
	text-transform: capitalize;
}
</style>
