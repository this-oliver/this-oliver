<template>
  <div>
    <b-row
      align-h="center">
      <b-col
        class="title bold-text mt-5"
        sm="10"
        md="10">
        🚧 {{ $t("wip.title") }} 😉
      </b-col>
    </b-row>
  </div>
</template>

<script>
	export default {
		name:"WorkInProgress"
	};
</script>

<style>
.red {
	border: 5px red solid;
}
</style>
