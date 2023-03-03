exports.throwError = function (message, status) {
	let errorMessage = undefined, errorStatus = undefined;

	if(message instanceof Error){
		errorMessage = message.message;
	} else if(typeof message === "string"){
		errorMessage = message;
	} else {
		errorMessage = message.message || "Unknown error";
	}

	if(status){
		errorStatus = status;
	} else {
		errorStatus = message.status || 500;
	}

	throw {
		message: errorMessage,
		status: errorStatus
	};
};
