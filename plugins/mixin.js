import Vue from "vue";

export default Vue.mixin({
	computed: {
		inAdminMode () {
			return false;
		}
	}
});
