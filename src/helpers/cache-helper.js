export let setCache = (key, value) => {
	try {
		var parsedValue = JSON.stringify(value);
		localStorage.setItem(key, parsedValue);
		return Promise.resolve(true);
	} catch (error) {
		return Promise.reject(error);
	}
};

export let getCache = key => {
	if (!localStorage.getItem(key)) return null;

	try {
		let value = JSON.parse(localStorage.getItem(key));
		
		if(!value){
			return null;
		}else{
			return value;
		}

	} catch (error) {
		return null;
	}
};

export let removeCache = key => {
	if (!localStorage.getItem(key)) return null;

	try {
		localStorage.removeItem(key);
		return true;
	} catch (error) {
		return null;
	}
};

export let enums = {
	TOKEN: "auth_token_key",
	USER: "user_cache_key",
};
