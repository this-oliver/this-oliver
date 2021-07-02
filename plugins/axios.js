/**
 * Handles axios errors
 * @param {Object} payload - $axios and redirect
 */
export default function ({ $axios, redirect }) {
	$axios.onError((error) => {
		if (error.response.status === 401) {
			// unauthorized endpoint
		}
	});
}
