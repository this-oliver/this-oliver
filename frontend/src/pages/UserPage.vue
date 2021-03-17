<template>
  <div>
    <b-row align-h="center">
      <b-col
        sm="12"
        md="10">
        <markdown-form />
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import MarkdownFormVue from "../components/MarkdownForm.vue";
	export default {
		name:"UserPage",
		components:{
			"markdown-form":MarkdownFormVue
		}
	};
</script>
