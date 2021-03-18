const namespaced = true;
import { setCache, getCache, enums as CachEnums } from "../../helpers/cache-helper";

const state = {
	user: null || getCache(CachEnums.USER),
	articles: []
};

const getters = {
	getUser: state => state.user,
	getArticles: state => state.articles,
};

const mutations = {
	setUser: (state, user) => {
		state.user = user;
		setCache(CachEnums.USER, user);
	},
	setArticles: (state, articles) => {
		state.articles = articles;
	}
};

const actions = {
	initUser: (context, user)=> {
		context.commit("setuser", user);
	},
	getArticles: async ()=> {},
	resetUser: ()=>{}
};

export default {
	namespaced,
	state,
	getters,
	mutations,
	actions
};
