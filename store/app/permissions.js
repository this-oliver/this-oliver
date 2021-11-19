import { STORAGE } from "~/logic/enums";
import { setCache, getCache, removeCache } from "~/utils/cache";

export const state = function () {
	return {
		cookiesAllowed: getCache(STORAGE.cookie) || false
	};
};

export const getters = {
	cookiesAllowed: (state) => state.cookiesAllowed
};

export const mutations = {
	allowCookies(state, allow) {
		state.cookiesAllowed = allow;

		if(allow){
			setCache(STORAGE.cookie, allow);
		}else {
			removeCache(STORAGE.cookie);
		}
	}
};
