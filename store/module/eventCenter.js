import {
	getEventDetail,
	getListWithoutClassify
} from '@/services/event.js';

const state = {
	list: [],
	total: 0,
	page: 1,
	size: 10,
	eventDetail: {}
};

const getters = {

};

const actions = {
	//新接口获取时间中心列表
	async getListWithoutClassify({
		commit
	}, params) {
		try {
			uni.showLoading({
				mask: true
			});
			const {
				data
			} = await getListWithoutClassify(params);
			console.log(data.total)
			const payload = {
				list: data.rows,
				page: params.page,
				total: data.total
			}
			commit('setList', {
				list: params.page === 1?[...data.rows]:[...state.list,...data.rows],
				total: payload.total,
			})
			uni.hideLoading()
		} catch (e) {
			console.log(e);
			// uni.showToast({
			// 	title: e.message
			// });
			return {}
		}
	},

	async getEventDetail({
		commit
	}, params) {
		try {
			const res = await getEventDetail(params)
			state.eventDetail = res.data
		} catch (e) {
			console.log(e)
		}
	}
};

const mutations = {
  setList(state, { list, total }) {
	  console.log(total)
      state.list = list;
      state.total = total;
    },
	setPage(state, page) {
		state.page = page
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
