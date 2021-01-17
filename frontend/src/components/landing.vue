<template>
  <div>
    <b-row align-h="center">
      <b-col
        class="mt-5"
        cols="auto">
        <b-button
          :to="resumeRoute"
          :variant="getBootstrapInverseTheme">
          {{ $t("landing.clickMe") }} 🎁
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import { ROUTES } from "../helpers/router-helper";
	export default {
		name: "Landing",
		data: function(){
			return {
				resumeRoute: ROUTES.resume
			};
		}
	};
</script>
