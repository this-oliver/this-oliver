<template>
  <div>
    <b-row align-h="center">
      <b-col
        class="mt-2"
        sm="12"
        md="9">
        <pdf :src="resumeUrl" />
      </b-col>
      <b-col
        class="mt-2"
        sm="2"
        md="1">
        <a
          :href="resumeUrl"
          download="oliver_manzi_resume.pdf">
          <b-button
            :variant="getBootstrapInverseTheme">
            {{ $t("form.actions.download") }}
          </b-button>
        </a>
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import pdf from "vue-pdf";
	export default {
		name: "ResumePage",
		components:{
			"pdf": pdf
		},
		data: function(){
			return {
				resumeUrl: require("../../assets/docs/resume.pdf")
			};
		},
	};
</script>
