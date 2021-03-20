<template>
  <div>
    <b-row align-h="center">
      <b-col
        class="mt-5"
        sm="8"
        md="4">
        <login-form />
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import LoginFormVue from "../components/forms/LoginForm.vue";
	export default {
		name:"AuthPage",
		components:{
			"login-form":LoginFormVue
		}
	};
</script>
