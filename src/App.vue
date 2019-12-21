<template>
  <div id="app">
    <b-jumbotron>Coming soon... 🤠</b-jumbotron>
    <b-container>
      <b-row>
        <b-col>
          <router-view />
        </b-col>
      </b-row>
      <b-row id="footer">
        <b-col>Oliver Manzi &hearts;</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  text-align: center;
}
</style>
