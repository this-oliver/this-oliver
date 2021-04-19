<template>
  <div :id="getTheme">
    <b-row
      align-h="center">
      <b-col
        class="page-title bold-text wip-text mt-5"
        md="4">
        <b-card
          img-src="@/assets/images/unsplash/wip-pop-zebra-wp81DxKUd1E-unsplash.jpg"
          :bg-variant="getOppositeBootstrapTheme"
          :text-variant="getBootstrapTheme">
          <b-card-text>
            🚧 {{ $t("pages.wip.title") }}
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
	export default {
		name:"WipPage",
	};
</script>
