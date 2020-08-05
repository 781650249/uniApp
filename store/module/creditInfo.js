import {
	getPersonInfoByPid,
	getRelationEntity,
	getTrajectory,
	faceIdentify
} from '@/services/creditInfo.js'
const state = {
	detailList: [],
	faceImageUrl: '',
	imgPid: '',
	relationPhotos: [],
	rate: '', //相似度
	education: '',
	nation: '',
	idValue:'',
	name:'',
	sexCn:'',
	domicile:'',
	cardId:''
}

const getters = {

}


const mutations = {
	setImg(state,payload){
		state.faceImageUrl = payload
	},
	setState(status, payload) {
		state.detailList = payload
	},
	setPid(status,payload){
		state.imgPid = payload.pid,
		state.education = payload.education
		state.nation = payload.nation
		state.middle = `${payload.nation}${payload.education}${payload.age}岁`
		state.rate = payload.rate,
		state.idValue = payload.idValue
		state.age = payload.age
		state.faceImageUrl = payload.url
		state.name = payload.name,
		state.domicile = payload.domicile
	}
}


const actions = {
	//获取基本信息
	async getPersonInfoByPid({
		commit
	}, params) {
		try {
			const {
				data
			} = await getPersonInfoByPid(params)
			console.log(data)
			commit('setState',data)
		} catch (e) {
			if (e.message) {
				uni.showToast({
					title: e.message,
					icon: 'none'
				});
			}
		}
	},
	//查询同人轨迹
	async getTrajectory({
		commit
	}, params) {
		try {
			const {
				data
			} = await getTrajectory(params)
	
		console.log(data)
		} catch (e) {
			if (e.message) {
				uni.showToast({
					title: '暂无轨迹',
					icon: 'none'
				});
			}
		}
	},
	//人脸认证
	async faceIdentify({
		commit
	}, params) {
		   uni.showLoading({ mask: true });
		try {
			const {
				data
			} = await faceIdentify(params)
			
	        
			if(data[0]){
				uni.hideLoading();
				commit('setPid',data[0])
				uni.navigateTo({
					url: './creditBasic'
				})
			}
			   	uni.hideLoading();
			
		} catch (e) {
			if(e.message){
				uni.showToast({
					icon:'none',
					title: '该图片无法识别对应身份信息'
				})
			}
			console.log(e)
		}
	},
	//关联实体
	async getRelationEntity({
		commit
	}, params) {
		try {
			const {
				data
			} = await getRelationEntity(params)
			state.relationPhotos = data.nodes
		} catch (e) {
			console.log(e)
			if (e.message) {
				uni.showToast({
					title: e.message,
					icon: 'none'
				});
			}
		}
	},
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
