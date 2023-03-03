exports.throwError = function (message, status) {
	throw {
		status: status || 400,
		message: message,
	};
};
