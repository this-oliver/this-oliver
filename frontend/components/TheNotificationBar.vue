<template>
	<div>
		<v-snackbar
			v-for="item in notifications"
			:key="item.id"
			app
			:value="item.show"
			:color="item.color"
			:top="item.top"
			:right="item.right"
			:centered="item.right === false"
			:timeout="item.time"
			multi-line>
			<b>{{ item.title }}</b>
			<v-divider />
			{{ item.message }}

			<template #action="{ attrs }">
				<v-btn
					icon
					v-bind="attrs"
					@click="item.show = false">
					<base-icon icon="close" />
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseIcon from "./base/BaseIcon.vue";

export default {
	name: "TheNotificationToast",
	components: { BaseIcon },
	data(){
		return {
			count: 0,
			notifications: []
		};
	},
	computed: {
		...mapGetters({
			success: "app/toaster/getSuccess",
			warnings: "app/toaster/getWarnings",
			errors: "app/toaster/getErrors"
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
				this.$store.commit("app/toaster/removeSuccess");
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
				this.$store.commit("app/toaster/removeWarning");
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
				this.$store.commit("app/toaster/removeError");
			}
		}
	},
	methods: {
		toast (
			title,
			message,
			color = "primary",
			top = true,
			right = true,
			time = 5000
		) {

			const id = this.count;
			const show = true;

			this.notifications.push({
				id,
				show,
				color,
				title,
				message,
				top,
				right,
				time
			});

			this.count = this.count + 1;
		},
		toastErrors (title, message) {
			this.toast(title, message, "error", true, true, 5000);
		},
		toastSuccess (title, message) {
			this.toast(title, message, "success", true, true, 5000);
		},
		toastWarning (title, message) {
			this.toast(title, message, "warning", true, true, 5000);
		},
		toastGeneral (title, message, color = "primary", top = true, right = false, time = 5000) {
			this.toast(title, message, color, top, right, time);
		}
	}
};
</script>
