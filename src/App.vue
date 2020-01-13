<template>
  <div id="app">
    <b-container fluid>
      <b-row id="navigation">
        <b-col>
          <div>
            <ul>
              <li id="brand">Olivermanzi</li>
              <li>Personal</li>
              <li>Work</li>
              <li>School</li>
              <li>Hobby</li>
            </ul>
          </div>
        </b-col>
      </b-row>
      <b-row id="content" class="body-text">
        <b-col>
          <router-view />
        </b-col>
      </b-row>
      <b-row id="footer">
        <b-col id="copyright">Oliver Manzi 🤠</b-col>
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
  position: relative;
  min-height: 100vh;

  background-color: black;
}

#content {
  min-height: 100vh;

  color: white;
  background-color: black;
}

#footer {
  position: absolute;
  bottom: 0;
  height: 15vh;
  width: 100%;

  color: white;
  background-color: rgba(0, 0, 0, 0.911);
}

#copyright {
  text-align: center;
}

#navigation {
  font-family: Andale Mono;
  color: white;
}

#navigation #brand {
  font-size: 2em;
  margin: 0vh 3vw 0vh 1vw;
}

#navigation ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

#navigation li {
  font-size: 1.5em;
  margin-right: 4vw;
  display: inline;
}

.title-text {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}

.body-text {
  font-family: Arial, Helvetica, sans-serif;
}

@media only screen and (max-width: 600px) {
  #navigation #brand {
    font-size: 1em;
    margin: 0vh 1vw 0vh 0.5vw;
  }
  #navigation li {
    font-size: 0.8em;
    margin-right: 1vw;
  }
}
</style>
