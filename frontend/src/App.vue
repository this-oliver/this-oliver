<template>
  <div :id="getTheme">
    <b-navbar
      :variant="getBootstrapTheme"
      :type="getBootstrapTheme"
      toggleable="sm">
      <b-navbar-brand class="brand">
        {{ getMyName }}
      </b-navbar-brand>

      <b-navbar-toggle target="nav" />
      <b-collapse
        id="nav"
        is-nav>
        <b-navbar-nav
          class="ml-auto"
          align="end">
          <b-nav-form>
            <b-form-checkbox
              switch
              size="lg"
              v-model="darkTheme" />
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-row
      id="content"
      align-h="center"
      align-v="stretch">
      <b-col cols="12">
        <router-view />
      </b-col>
    </b-row>

    <b-row
      id="foot"
      align-h="center">
      <b-col cols="12">
        <b-row align-h="center">
          <b-col
            class="mx-1 my-1"
            cols="auto"
            v-for="item in getFooterItems"
            :key="item.link">
            <a
              :href="item.link"
              target="_blank">
              <b-img-lazy
                :src="item.src"
                width="25"
                alt="item.title" />
            </a>
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col
            class="my-1"
            cols="auto">
            <small>{{ $t("footer.copyright", {year: getYear}) }}</small>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import {getCurrentYear} from "./helpers/time-helper";
	export default {
		name: "App",
		data: function() {
			return {
				darkTheme: false,
				showOlivier: false
			};
		},
		computed: {
			getMyName: function(){
				return `${this.showOlivier? "Olivier":"Oliver"} Manzi`;
			},
			getTheme: function() {
				return this.darkTheme ? "dark-theme" : "light-theme";
			},
			getBootstrapTheme: function() {
				return this.darkTheme ? "dark" : "light";
			},
			getFooterItems: function(){
				return [
					{
						title: "Github",
						src: this.darkTheme? require("./assets/images/footer/github_light.png") : require("./assets/images/footer/github_dark.png"),
						link: "https://github.com/olivermanzi"
					},
					{
						title: "LinkedIn",
						src: this.darkTheme? require("./assets/images/footer/linkedin_light.png") : require("./assets/images/footer/linkedin_dark.png"),
						link: "https://www.linkedin.com/in/oliver-manzi/"
					},
					{
						title: "FetchQr",
						src: this.darkTheme? require("./assets/images/footer/fetch_light.png") : require("./assets/images/footer/fetch_dark.png"),
						link: "https://fetchqr.com"
					},
				];
			},
			getYear: function(){
				return `2020 - ${getCurrentYear()}`;
			}
		},
		methods: {
			toggleTheme: function() {
				this.darkTheme = !this.darkTheme;
			},
			randomlyShowOlivier: function(){
				const MAX_SECONDS = 5; //seconds
				let randomSecond = 2000; //milliseconds
				setInterval(()=>{
					this.showOlivier = !this.showOlivier;
					this.randomSecond = Math.floor(Math.random() * Math.floor(MAX_SECONDS)) + 1; // add one so that it is never zero
				}, randomSecond);
			}
		},
		created: function(){
			this.randomlyShowOlivier();
		}
	};
</script>
