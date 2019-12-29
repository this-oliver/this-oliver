<template>
  <div id="app">
    <b-navbar id="navigation" class="body-text" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Olivermanzi</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Personal 🤠</b-nav-item>
          <b-nav-item href="#">School 🎓</b-nav-item>
          <b-nav-item href="#">Work 💼</b-nav-item>
          <b-nav-item href="#">Hobby 🗃</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">SWE</b-dropdown-item>
            <b-dropdown-item href="#">FR</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <b-row id="content" class="body-text">
        <b-col>
          content
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
  position: relative;
  min-height: 100vh;
}

#content {
  padding-bottom: 15vh;
}

#footer {
  position: absolute;
  bottom: 0;
  height: 15vh;
}

#navigation {
  font-family: Andale Mono;
}

.title-text {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}

.body-text {
}
</style>
