<template>
  <div>
    <b-row align-h="between">
      <b-col
        class="sub-header"
        sm="auto"
        md="auto">
        {{ $t("views.experience.title") }}
      </b-col>
      <b-col
        v-if="editMode"
        cols="auto">
        <router-link
          class="simple-link"
          :to="{ name: ROUTES.admin.experienceCreate }">
          +
        </router-link>
      </b-col>
    </b-row>
    <b-row v-if="xpList.length > 0">
      <b-col
        cols="12"
        v-for="(xp, index) in xpList"
        :key="xp._id">
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
	import XpCardVue from "../cards/XpCard.vue";
	export default {
		name:"ExperiencesView",
		components:{
			"xp-card": XpCardVue
		},
		props:{
			xpList:{
				type: Array,
				required: true
			},
			editMode:{
				type: Boolean,
				default: false
			}
		}
	};
</script>
