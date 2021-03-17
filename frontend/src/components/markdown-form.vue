<template>
  <div>
    <b-row
      class="mt-1"
      align-h="center">
      <b-col cols="12">
        <b-form-textarea
          v-model="form.text"
          rows="10"
          :placeholder="$t('adminPage.bioForm.promptBio')" />
      </b-col>
    </b-row>

    <b-row
      class="mt-1"
      align-h="between">
      <b-col
        sm="3"
        md="3">
        <b-button
          block
          variant="outline-secondary"
          :disabled="!form.text"
          @click="showMarkdown = true">
          {{ $t("form.actions.preview") }}
        </b-button>
      </b-col>
      <b-col
        sm="3"
        md="3">
        <b-button
          block
          variant="primary"
          @click="submit">
          <span v-if="editMode">{{ $t("form.actions.update") }}</span>
          <span v-else>{{ $t("form.actions.post") }}</span>
        </b-button>
      </b-col>
    </b-row>

    <b-modal
      v-model="showMarkdown"
      centered
      hide-footer>
      <b-row
        align-h="center">
        <b-col cols="11">
          <div
            v-html="getMarkdown" />
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
	import Marked from "marked";
	export default {
		name:"MarkdownForm",
		props:{
			editMode: {
				type: Boolean,
				default: false
			}
		},
		emits: ["submitted"],
		data: function(){
			return{
				form:{
					text: null
				},
				showMarkdown: false
			};
		},
		computed: {
			getMarkdown: function(){
				if(this.form.text){
					return Marked(this.form.text);
				}else{
					return null;
				}
			}
		},
		methods: {
			submit: function(){
				this.$emit("submitted", this.form.text);
			}
		}
	};
</script>

<style>
#profile-text{
	border: 1px solid black;
}
</style>
