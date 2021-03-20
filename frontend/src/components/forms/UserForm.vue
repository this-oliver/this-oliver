<template>
  <div>
    <!-- name and user -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        class="sub-header"
        md="auto">
        {{ $t("adminPage.userForm.name") }}
      </b-col>
      <b-col md="10">
        <b-row align-h="start">
          <b-col md="10">
            <b-form-input
              v-model="form.name"
              :placeholder="$t('adminPage.userForm.promptName')" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- short bio -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        class="sub-header"
        md="auto">
        {{ $t("adminPage.bioForm.shortBio") }}
      </b-col>
      <b-col md="10">
        <b-row align-h="end">
          <b-col md="10">
            <b-textarea
              v-model="form.bio.short"
              disabled />
          </b-col>
          <b-col md="2">
            <b-button
              variant="outline-primary"
              :disabled="form.bio.short && form.bio.short.length > 0"
              @click="showShortBioForm=true">
              {{ $t("form.actions.preview") }}
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- long bio -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        class="sub-header"
        md="auto">
        {{ $t("adminPage.bioForm.longBio") }}
      </b-col>
      <b-col md="10">
        <b-row align-h="end">
          <b-col md="10">
            <b-textarea
              v-model="form.bio.long"
              disabled />
          </b-col>
          <b-col md="2">
            <b-button
              variant="outline-primary"
              :disabled="form.bio.long && form.bio.long.length > 0"
              @click="showLongBioForm=true">
              {{ $t("form.actions.preview") }}
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- education -->
    <b-row
      class="mt-2"
      align-h="center" />
    <!-- work -->
    <b-row
      class="mt-2"
      align-h="center" />
    <!-- actions -->
    <b-row
      class="mt-2"
      align-h="end">
      <b-col md="3">
        <b-button
          v-if="editMode"
          block
          variant="warning"
          @click="update">
          {{ $t("form.actions.update") }}
        </b-button>
        <b-button
          v-else
          block
          variant="primary"
          @click="post">
          {{ $t("form.actions.post") }}
        </b-button>
      </b-col>
    </b-row>

    <!-- modals -->
    <b-modal
      v-model="showShortBioForm"
      :title="$t('adminPage.bioForm.shortBio')"
      hide-footer
      size="xl">
      <span
        v-if="form.bio.short && form.bio.short.length > 0"
        v-html="getMarkDown(form.bio.short)" />
      <span v-else>...</span>
    </b-modal>
    <b-modal
      v-model="showLongBioForm"
      :title="$t('adminPage.bioForm.longBio')"
      hide-footer
      size="xl">
      <span
        v-if="form.bio.long && form.bio.long.length > 0"
        v-html="getMarkDown(form.bio.long)" />
      <span v-else>...</span>
    </b-modal>
  </div>
</template>

<script>
	import Marked from "marked";
	export default {
		name:"UserForm",
		props:{
			editMode:{
				type:Boolean,
				default: false
			}
		},
		data: function(){
			return{
				form:{
					name:null,
					bio:{
						short: null,
						long: null
					}
				},
				showShortBioForm: false,
				showLongBioForm: false
			};
		},
		methods:{
			post: function(){
				// post
			},
			update: function(){
				// update
			},
			getMarkDown: function(text){
				if(text){
					return Marked(text);
				}else{
					return null;
				}
			},
			handleShortBio: function(text){
				this.form.bio.short = text;
			},
			handleLongBio: function(text){
				this.form.bio.long = text;
			}
		}
	};
</script>
