<template>
  <div>
    <b-row align-h="between">
      <b-col
        class="sub-header"
        sm="auto"
        md="auto">
        {{ $t("pages.user.about") }}
      </b-col>
      <b-col
        v-if="editMode"
        sm="auto"
        md="auto">
        <router-link
          class="simple-link"
          :to="{name: ROUTES.admin.bio}">
          {{ $t("form.actions.update") }}
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <bio-card
          :short="user.bio.short"
          :long="user.bio.long" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import BioCardVue from "../cards/BioCard.vue";

	export default {
		name:"AboutMeView",
		props:{
			user:{
				type: Object,
				required: true
			},
			editMode: {
				type: Boolean,
				default: false
			}
		},
		components:{
			"bio-card":BioCardVue
		},
		data: function(){
			return {
				showForm: false
			};
		}
	};
</script>
