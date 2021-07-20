<template>
	<div />
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "TheNotificationToast",
		computed: {
			...mapGetters({
				success: "base/toaster/getSuccess",
				warnings: "base/toaster/getWarnings",
				errors: "base/toaster/getErrors"
			})
		},
		watch: {
			success (newSuccess) {
				// if success list is not empty
				if (newSuccess.length > 0) {
					// extract success title and message
					const success = newSuccess[0];
					const title = success.title;
					const message = success.message;
					// toast success title and message
					this.toastSuccess(title, message);
					// remove success
					this.$store.commit("base/toaster/removeSuccess");
				}
			},
			warnings (newWarnings) {
				// if warning list is not empty
				if (newWarnings.length > 0) {
					// extract warning title and message
					const warning = newWarnings[0];
					const title = warning.title;
					const message = warning.message;
					// toast warning title and message
					this.toastWarning(title, message);
					// remove warning
					this.$store.commit("base/toaster/removeWarning");
				}
			},
			errors (newErrors) {
				// if error list is not empty
				if (newErrors.length > 0) {
					// extract error title and message
					const error = newErrors[0];
					const title = error.title;
					const message = error.message;
					// toast error title and message
					this.toastErrors(title, message);
					// remove error
					this.$store.commit("base/toaster/removeError");
				}
			}
		},
		methods: {
			toast (
				title,
				message,
				variant = "dark",
				position = "b-toaster-top-full"
			) {
				// Use a shorter name for this.$createElement
				const h = this.$createElement;
				const TOAST_ID = `MIXIN_TOASTER-${title}`;

				// Create the message
				const messageNode = h("div", [h("p", { class: "mr-2" }, message)]);

				// Create the title
				const titleNode = h(
					"div",
					{ class: ["d-flex", "flex-grow-1", "align-items-baseline", "mr-2"] },
					[h("strong", { class: "mr-2" }, title)]
				);

				this.$bvToast.toast([messageNode], {
					id: TOAST_ID,
					title: titleNode,
					solid: true,
					variant,
					appendToast: true,
					toaster: position
				});
			},
			toastSuccess (title, message) {
				this.toast(title, message, "success");
			},
			toastWarning (title, message) {
				this.toast(title, message, "warning");
			},
			toastErrors (title, message) {
				this.toast(title, message, "danger");
			}
		}
	};
</script>
