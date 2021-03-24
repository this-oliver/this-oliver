<template>
  <div :id="getTheme">
    <b-row
      align-h="center">
      <b-col
        class="sub-header bold-text wip-text mt-5"
        md="4">
        <b-card
          img-src="@/assets/images/unsplash/404-francesca-saraco-VKPAzDovWKU-unsplash.jpg"
          :bg-variant="getOppositeBootstrapTheme"
          :text-variant="getBootstrapTheme">
          <b-card-text>
            🔍 {{ $t("pages.404.card") }}
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
	export default {
		name:"MissingPage"
	};
</script>
