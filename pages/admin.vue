<template>
	<div>
		<b-row align-h="center">
			<b-col
				sm="12"
				md="11">
				admin
			</b-col>
		</b-row>
	</div>
</template>

<script>
	export default {
		name: "AdminPage",
		middleware: "auth"
	};
</script>
