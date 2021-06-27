<template>
	<div>
		<b-row align-h="between">
			<b-col
				class="layout-title"
				sm="auto"
				md="auto">
				experiences
			</b-col>
			<b-col
				v-if="editMode"
				cols="auto">
				<nuxt-link
					class="simple-link"
					to="experiences/create">
					<b> + </b>
				</nuxt-link>
			</b-col>
		</b-row>
		<hr>
		<b-row v-if="xpList.length > 0">
			<b-col
				v-for="(xp, index) in xpList"
				:key="xp._id"
				cols="12">
				<xp-card
					class="mt-1"
					:xp="xp"
					:short-mode="true"
					:edit-mode="editMode" />
				<hr v-if="index < xpList.length - 1">
			</b-col>
		</b-row>
		<b-row
			v-else
			align-h="center">
			<b-col cols="auto">
				...
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import XpCardVue from "../components/cards/XpCard.vue";
	export default {
		name: "ExperiencesLayout",
		components: {
			"xp-card": XpCardVue
		},
		props: {
			xpList: {
				type: Array,
				required: true
			},
			editMode: {
				type: Boolean,
				default: false
			}
		}
	};
</script>
