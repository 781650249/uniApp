import { getCommunityInfo } from '@/services/auth.js';

const state = {
	communityList: []
};

const getters = {

};

const actions = {
	async getCommunityInfo({ commit }, products) {
		try{
			const res = await getCommunityInfo(products);
			console.log(res)
		}catch(e){
			//TODO handle the exception
			console.log(e)
		}
	}
};

const mutations = {
	setState(state, { payload }) {
		return {
			...state,
			...payload,
		};
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
