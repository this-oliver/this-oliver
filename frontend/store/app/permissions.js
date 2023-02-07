import { STORAGE } from "~/logic/enums";
import StorageUtil from "~/utils/storage";
import { setCache, getCache, removeCache } from "~/utils/storage";

export const state = function () {
	return {
		cookiesAllowed: StorageUtil.getStorage(STORAGE.cookie) || false
	};
};

export const getters = {
	cookiesAllowed: (state) => state.cookiesAllowed
};

export const mutations = {
	allowCookies(state, allow) {
		state.cookiesAllowed = allow;

		if(allow){
			StorageUtil.setStorage(STORAGE.cookie, allow);
		}else {
			StorageUtil.removeStorage(STORAGE.cookie);
		}
	}
};
