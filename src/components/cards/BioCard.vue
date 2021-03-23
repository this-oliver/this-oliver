<template>
  <div>
    <b-row
      align-h="center">
      <b-col
        cols="auto">
        <b-button-group>
          <b-button 
            class="mx-1"
            size="sm"
            :variant="(shortBio)?`primary`:`outline-primary`"
            @click="shortBio = true">
            {{ $t("cards.bio.actions.short") }}
          </b-button>
          <b-button 
            class="mx-1"
            size="sm"
            :variant="(shortBio)?`outline-danger`:`danger`"
            @click="shortBio = false">
            {{ $t("cards.bio.actions.long") }}
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <b-row
      class="mt-3"
      align-h="center">
      <b-col
        cols="12">
        <div
          class="bio-text"
          v-html="getMarkdown" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import { getMarkdown } from "../../helpers/markdown-helper";

	export default {
		name:"BioCard",
		props:{
			short:{
				type: String,
				required: true
			},
			long:{
				type: String,
				required: true
			},
		},
		data: function(){
			return {
				shortBio: true,
			};
		},
		computed:{
			getMarkdown: function(){
				return this.shortBio ? getMarkdown(this.short) : getMarkdown(this.long);
			}
		},

	};
</script>
