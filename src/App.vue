<template>
  <div :id="getTheme">
    <b-container
      id="container"
      fluid>
      <b-navbar
        :variant="getBootstrapTheme"
        :type="getBootstrapTheme"
        toggleable="sm"
        sticky>
        <b-navbar-brand
          class="brand"
          :to="{ name: ROUTES.user.landing }">
          Oliver Manzi
        </b-navbar-brand>

        <b-navbar-toggle target="nav" />
        <b-collapse
          id="nav"
          is-nav>
          <b-navbar-nav
            class="ml-auto"
            align="end">
            <!-- links -->
            <b-nav-form
              class="mx-2"
              v-for="item in navigationItems"
              :key="item.title">
              <b-link
                class="simple-link"
                :to="{name: item.route}">
                {{ item.title }}
              </b-link>
            </b-nav-form>
            <!-- logout -->
            <b-nav-form class="mx-2">
              <span
                v-if="inAdminMode"
                class="simple-link"
                @click="logout">
                {{ `${$t("form.actions.logout")} ✌️` }}
              </span>
            </b-nav-form>
            <!-- theme -->
            <b-nav-form class="mx-2">
              <b-button
                pill
                :variant="getBootstrapInverseTheme"
                @click="toggleTheme">
                <span v-if="isDarkTheme">
                  ☀️
                </span>
                <span v-else>
                  🌘
                </span>
              </b-button>
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
        id="footer"
        class="my-1"
        align-h="center">
        <b-col
          sm="11"
          md="4">
          <b-row align-h="center">
            <b-col
              class="mx-1"
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
        </b-col>

        <b-col
          class="my-1"
          sm="auto"
          md="auto">
          <small class="bold-text">
            <router-link :to="{ name: ROUTES.admin.profile }">
              🤠
            </router-link>
            Oliver Manzi 
            <small> 
              &copy; [{{ getYear }}] 
            </small>
          </small>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
	import {getCurrentYear} from "./helpers/time-helper";
	import {getNavigationItems} from "./helpers/navigation-helper";
	import { mapActions } from "vuex";

	export default {
		name: "App",
		data: function() {
			return {
				loading: false,
				showOlivier: false,
				navigationItems: getNavigationItems()
			};
		},
		computed: {
			getStyle: function(){
				return `${this.getTheme} container`;
			},
			getYear: function(){
				return `2020 - ${getCurrentYear()}`;
			},
			getFooterItems: function(){
				return [
					{
						title: "Github",
						src: this.isDarkTheme? require("./assets/images/footer/github_light.png") : require("./assets/images/footer/github_dark.png"),
						link: "https://github.com/olivermanzi"
					},
					{
						title: "LinkedIn",
						src: this.isDarkTheme? require("./assets/images/footer/linkedin_light.png") : require("./assets/images/footer/linkedin_dark.png"),
						link: "https://www.linkedin.com/in/oliver-manzi/"
					},
					{
						title: "FetchQr",
						src: this.isDarkTheme? require("./assets/images/footer/fetch_light.png") : require("./assets/images/footer/fetch_dark.png"),
						link: "https://fetchqr.com"
					},
				];
			},
			inAdminMode: function(){
				let route = this.$route;
				let matched = route.matched;
				let adminMode = false;
				
				for (let i = 0; i < matched.length; i++) {
					let currentRoute = matched[i];
					if (currentRoute.components.default.name === "AdminPage") {
						adminMode = true;
					}
				}
				return adminMode;
			}
		},
		methods: {
			...mapActions({
				logout: "auth/logout"
			}),
		},
		created: async function(){
			this.loading = true;
			await this.$store.dispatch("user/initUser");
			this.loading = false;
		}
	};
</script>
