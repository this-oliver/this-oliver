<template>
  <div>
    <b-container fluid>
      <b-row id="local-content">
        <b-col>
          <p id="coming-soon" class="title-text">Coming soon...</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "homepage",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#local-content {
  text-align: center;
}

#coming-soon {
  padding-top: 20vh;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 3em;
}
</style>
