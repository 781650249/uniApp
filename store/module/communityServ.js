import {
	getIndexStatisticsDataForPolice,
	getList,
	switchCommunityDataSource
} from '@/services/communityServ.js'
const state = {
	homeInfo: {},
	residentHandleCount: 0,
	warnHandleCount: 0,
	index: 0,
	AreaInfo: [],
	communityId: ''
}

const getters = {

}


const mutations = {
	setStates(state, payload) {
		Object.keys(payload).forEach((el) => {
			state[el] = payload[el]
		})
	},
	setCommunityId(state, payload) {
		state.communityId = payload
	},
	setAreaList(state, payload) {
		state.AreaInfo = payload
	},
	setArea(state, payload) {
		state.index = payload
	},
}


const actions = {
	async getIndexStatisticsDataForPolice({
		commit
	}) {
		try {
			const {
				data
			} = await getIndexStatisticsDataForPolice()
			commit('setStates', data)
		} catch (e) {

		}
	},
	//获取小区列表
	async getList({
		commit,dispatch
	}, params) {
		try {
			const {
				data
			} = await getList(params)
			const payload = data.map((item, index) => ({
				communityId: item.communityId,
				communityName: item.communityName,
				index: index
			}))
			commit('setAreaList', payload)
			if(!this.communityId){
				commit('setCommunityId',payload[0].communityId)
			}
		} catch (e) {
			console.log(e)
		}
	},
	//切换小区数据源
	async switchCommunityDataSource({
		commit
	}, params) {
		try {
			const {
				data
			} = await switchCommunityDataSource(params)

		} catch (e) {

		}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
