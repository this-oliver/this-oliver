export const state = function () {
	return {
		success: [],
		warnings: [],
		errors: []
	};
};

export const getters = {
	getSuccess (state) {
		return [...state.success];
	},
	getWarnings (state) {
		return [...state.warnings];
	},
	getErrors (state) {
		return [...state.errors];
	}
};

export const mutations = {
	addSuccess (state, { title, message }) {
		state.success.push({ title, message });
	},
	addWarning (state, { title, message }) {
		state.warnings.push({ title, message });
	},
	addError (state, { title, message }) {
		state.errors.push({ title, message });
	},
	removeSuccess (state) {
		state.success.pop();
	},
	removeWarning (state) {
		state.warnings.pop();
	},
	removeError (state) {
		state.errors.pop();
	}
};
