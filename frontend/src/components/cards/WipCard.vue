<template>
  <div :id="getTheme">
    <b-row
      align-h="center">
      <b-col
        class="sub-header bold-text wip-text mt-5"
        md="4">
        <b-card
          img-src="@/assets/images/unsplash/wip-pop-zebra-wp81DxKUd1E-unsplash.jpg"
          :bg-variant="getBootstrapTheme"
          :text-variant="getBootstrapInverseTheme">
          🚧
          <hr>
          <b-card-text>{{ $t("wip.title") }}</b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
	export default {
		name:"WorkInProgress",

	};
</script>

<style>
.red {
	border: 5px red solid;
}

.wip-text{
	text-align: center;
}
</style>
