<template>
	<div v-if="loading">
		<experience-card
			v-for="skeleton in [0, 1, 2, 3, 4, 5]"
			:key="skeleton"
			:experience="{}"
			:skeleton-mode="true" />
	</div>

	<v-row
		v-else-if="experiences.length > 0"
		justify="center">
		<v-col
			cols="12"
			md="8"
			class="my-1">
			<base-btn
				v-for="type in types"
				:key="type.value"
				:color="getExperienceColor(type.value)"
				:text="isSelectedType(type.value)"
				:elevation="isSelectedType(type.value) ? 1 : 0"
				rounded
				class="ma-1 text-center"
				@click="selectType(type.value)">
				{{ type.text }}
			</base-btn>
		</v-col>
		<v-col
			v-for="experience in xpList"
			:key="experience._id"
			cols="12"
			md="10"
			class="my-1">
			<experience-card
				:experience="experience"
				:short-mode="true"
				:edit-mode="editMode" />
		</v-col>
	</v-row>

	<v-row
		v-else
		justify="center">
		<v-col cols="auto">
			...
		</v-col>
	</v-row>
</template>

<script>
import { EXPERIENCES } from "~/logic/enums";
import { getExperienceColor } from "~/logic/experience";
import { capitalizeText } from "~/utils/string";

import ExperienceCard from "~/components/experience/ExperienceCard.vue";
export default {
	name: "ExperienceList",
	components: {
		ExperienceCard
	},
	props: {
		experiences: {
			type: Array,
			required: true
		},
		editMode: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		}
	},
	data(){
		return {
			selectedTypes: []
		};
	},
	computed: {
		xpList() {
			if(this.selectedTypes.length > 0){
				return this.experiences.filter(xp => this.isSelectedType(xp.type));
			}else{
				return this.experiences;
			}
		},
		types() {
			return Object.keys(EXPERIENCES).map((key) => {
				return {
					value: key,
					text: capitalizeText(EXPERIENCES[key])
				};
			});
		}
	},
	methods:{
		selectType(type){
			if(this.isSelectedType(type)){
				// remove from selected
				this.selectedTypes = this.selectedTypes.filter((t) => t !== type);
			} else {
				// add to selected
				this.selectedTypes.push(type);
			}
		},
		isSelectedType(type){
			return this.selectedTypes.includes(type);
		},
		getExperienceColor(type) {
			return getExperienceColor(type);
		}
	}
};
</script>
