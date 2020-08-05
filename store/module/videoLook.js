import {
	getPlayLiveVideoUrl,
	selectCameraListByCommunity,
	getList
} from '@/services/video.js'

const state = {
	liveVideoUrl: '',
	AreaInfo: [{communityName:'选择小区'}],
	onlyArea:'',
	videoList: {
		list: [],
		pageNum: 1,
		total: 0,
		keyword: '',
		communityId: ''
	},
	pageSize: 10,
}


const getters = {

};


const actions = {
	async getPlayLiveVideoUrl({
		commit
	}, params) {
	uni.showLoading({
		mask: true
	});
		try {
			const {
				data
			} = await getPlayLiveVideoUrl(params)
			commit('setliveVideoUrl',data.playUrl)
			uni.hideLoading()
		} catch (e) {
			console.log(e)
			uni.hideLoading()
		}
	},
	//获取摄像头列表
	async selectCameraListByCommunity({
		commit
	}, params) {
		try {
			uni.showLoading({
				mask: true
			});
			const {
				data
			} = await selectCameraListByCommunity(params)
			const payload = {
				list: data.rows.map(item => ({
					spbfbm: item.spbfbm,
					azdd: item.azdd,
					cameraType: item.cameraType
				})),
				keyword: params.keyword,
				communityId: params.communityId,
				total: data.total,
				pageNum: params.pageNum
			}
			commit('setState', payload)
			if (payload.list && payload.list.length) {
				payload.list.forEach((item, index) => {
					if (index === 0) {
						commit('setUrl', item.spbfbm)
					}
				})
			}
			if (payload.list.length === 0) {
				setTimeout(() => {
					uni.showToast({
						title: '暂无监控',
						icon:'none'
					})
				})
			}
			uni.hideLoading()
			return payload
		} catch (e) {
			console.log(e)
			return {};
		}
	},
	//获取小区列表
	async getList({
		commit
	}, params) {
		try {
			const {
				data
			} = await getList(params)
			console.log(data)
			data.unshift({
				communityId: '',
				communityName: '选择小区',
				xqxxbz: ''
			})
			// state.AreaInfo = data
			commit('setAreaInfo',data)
		} catch (e) {
			console.log(e)
		}
	}
}

const mutations = {
	setAreaInfo(state,payload){
		state.AreaInfo = payload
	},
	setUrl(state, payload) {
		state.liveVideoUrl = payload
	},
	setState(state, {
		list,
		pageNum,
		total,
		keyword,
		communityId
	}) {
		state.videoList.list = pageNum === 1 ? list : [...state.videoList.list, ...list],
		state.videoList.pageNum = pageNum,
		state.videoList.total = total
		state.videoList.keyword = keyword
		state.videoList.communityId = communityId
	},
	setArea(state,payload){
		state.onlyArea = payload
	},
	setliveVideoUrl(state,payload){
		state.liveVideoUrl = payload
	}
}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
