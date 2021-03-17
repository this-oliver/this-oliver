<template>
  <div>
    <b-row align-h="center">
      <b-col
        sm="12"
        md="11">
        <user-form :edit-mode="true" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import UserForm from "../components/UserForm.vue";
	export default {
		name:"UserPage",
		components:{
			UserForm
		}
	};
</script>
