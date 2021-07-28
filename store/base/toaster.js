export const state = function () {
	return {
		success: [],
		warnings: [],
		errors: [],
		history: []
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
		const toast = state.success.pop();
		state.history.push(toast);
	},
	removeWarning (state) {
		const toast = state.warnings.pop();
		state.history.push(toast);
	},
	removeError (state) {
		const toast = state.errors.pop();
		state.history.push(toast);
	}
};
