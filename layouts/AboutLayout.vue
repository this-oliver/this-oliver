<template>
	<div>
		<b-row align-h="between">
			<b-col
				class="layout-title"
				sm="auto"
				md="auto">
				about
			</b-col>
			<b-col
				v-if="editMode"
				sm="auto"
				md="auto">
				<nuxt-link
					class="simple-link"
					to="/">
					update
				</nuxt-link>
			</b-col>
		</b-row>
		<b-row>
			<b-col v-if="user" cols="12">
				<bio-card
					:short="user.bio.short"
					:long="user.bio.long" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import BioCardVue from "../components/cards/BioCard.vue";

	export default {
		name: "AboutLayout",
		components: {
			"bio-card": BioCardVue
		},
		props: {
			user: {
				type: Object,
				required: true
			},
			editMode: {
				type: Boolean,
				default: false
			}
		}
	};
</script>
