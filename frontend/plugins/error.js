class ApiError extends Error {
	constructor (status, message) {
		super(message);

		this.title = "ApiError";
		this.status = status;
		this.message = message;
	}
}

/**
 * Routes to error page
 * @param {Object} payload - payload with status + message
 */
const handleError = {
	api: ({ status, message }) => {
		throw new ApiError(status, message);
	}
};

export default (context, inject) => {
	inject("handleError", handleError);
};
