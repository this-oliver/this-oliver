<template>
	<div>
		<nuxt-child />
	</div>
</template>

<script>
	import { STORAGE } from "../logic/enums";

	export default {
		name: "Landing",
		async asyncData ({ store, $auth }) {
			// check if client has visited website before
			const hasVisited = $auth.$storage.getUniversal(STORAGE.visitor);

			// if visitor storage does not exist, increment visit count and store visitor flag
			if (!hasVisited) {
				try {
					await store.dispatch("user/incrementVisits");
					$auth.$storage.setUniversal(STORAGE.visitor, STORAGE.visitor);
				} catch (error) {
				}
			}
		}
	};
</script>
