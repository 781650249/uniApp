import {
	getList,
	getDetail,
	updateStatus,
} from '@/services/audit.js';


const state = {
	auditStatus: '0', // 未通过 0 || 已审核 1
	treated: {       //已审核的
		list: [],
		pageNum: 1,
		total: 0,
	},
	untreated: {   //待审核的
		list: [],
		pageNum: 1,
		total: 0,
	},
	pageSize: 10,
	detail: {},
	photoImg:'',
	faceInfo:'',
	creditInfo:''
}

const getters = {}

const mutations = {
	setStatus(state, status) {
		state.auditStatus = status;
	},
	setTreatedList(state, {
		list,
		pageNum,
		total
	}) {
		console.log(list)
		state.treated = {
			list: pageNum === 1 ? list : [...state.treated.list, ...list],
			pageNum,
			total
		};
	},
	setUntreatedList(state, {
		list,
		pageNum,
		total
	}) {
		state.untreated = {
			list: pageNum === 1 ? list : [...state.untreated.list, ...list],
			pageNum,
			total,
		};
	},
	setDetail(state, detail) {
		state.detail = { ...detail};
		state.creditInfo = detail.zjzEmblem
		state.faceInfo = detail.zjzFace
		state.photoImg = detail.xp
	},
}

const actions = {
	async getList({
		commit
	}, params) {
		try {
			uni.showLoading({
				mask: true
			});
			const {
				data = {}
			} = await getList(params);
			console.log(params)
			const payload = {
				list: data.rows.map(item => ({
					id: item.id,
					xp: item.xp,
					xm: item.xm,
					ypzgxdm: item.ypzgxdm,
					xqmc: `${item.xqmc}${item.ldmc}${item.dymc}`,
				})),
				pageNum: params.pageNum,
				total: data.total,
			};
			if(params.isNodeAudited=="0"){
				commit('setUntreatedList', payload);
			}else{
				commit('setTreatedList', payload);
			}
			uni.hideLoading();
			return payload;
		} catch (e) {
			// TODO handle the exception
			return {};
		}

	},


	async getDetail({
		commit
	}, params) {
		uni.showLoading({
			mask: true
		});
		try {
			const {
				data = {}
			} = await getDetail(params);
			commit('setDetail', data);
		} catch (e) {
			// TODO handle the exception
			console.log(e);
		}
		uni.hideLoading();
	},
	
	async updateStatus({
		dispatch
	}, params) {
		uni.showLoading({
			mask: true
		});
		try {
		const res	= await updateStatus(params);
			console.log(res)
			dispatch('getList', {
				auditNode: 3,
				isNodeAudited: "0",
				pageNum: 1,
				pageSize: 10
			});
			dispatch('getList', {
				auditNode: 3,
				isNodeAudited: "1",
				pageNum: 1,
				pageSize: 10
			});
		} catch (e) {
			// TODO handle the exception
			console.log(e);
			if(e.message){
				uni.showToast({
					title:e.message,
					icon:'none'
				})
			}
		}
		uni.hideLoading();
	},
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
