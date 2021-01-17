<template>
  <div>
    <b-row align-h="center">
      <b-col
        class="mt-5"
        cols="auto">
        <b-button
          :variant="getBootstrapInverseTheme"
          @click="goToResume">
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
		methods: {
			goToResume: function(){
				this.goTo(ROUTES.resume);
			}
		}
	};
</script>
