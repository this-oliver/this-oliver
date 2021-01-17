<template>
  <div>
    <b-row align-h="center">
      <b-col
        class="mt-5"
        cols="auto">
        <b-button
          :variant="getBootstrapInverseTheme"
          @click="goToLanding">
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
			goToLanding: function(){
				this.goTo(ROUTES.landing, this);
			}
		}
	};
</script>
