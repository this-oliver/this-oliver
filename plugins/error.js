/**
 * Routes to error page
 * @param {Object} payload - payload with status + message
 */
const handleError = error => ({ statusCode, message }) => {
	error({ statusCode, message });
};

export default (ctx, inject) => {
	// inject api into vue components and nuxt context
	inject("handleError", handleError(ctx.error));
};
