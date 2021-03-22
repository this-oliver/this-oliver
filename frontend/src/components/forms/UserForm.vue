<template>
  <div>
    <!-- name and user -->
    <b-row
      class="mt-2"
      align-h="between">
      <b-col
        class="sub-header"
        md="auto">
        {{ $t("forms.user.name") }}
      </b-col>
      <b-col md="10">
        <b-row align-h="start">
          <b-col md="10">
            <b-form-input
              v-model="form.name"
              :placeholder="$t('forms.user.promptName')" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
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
				},
			};
		},
		methods:{
			post: function(){
				// post
			},
			update: function(){
				// update
			},
		}
	};
</script>
