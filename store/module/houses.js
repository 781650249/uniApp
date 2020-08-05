import { getList,getCommunityList,getHouseCascade } from '@/services/house.js';
//获取所有住户信息列表  获取小区列表  获取楼栋级联信息
export default {
  namespaced: true,
  state: {
    list: [],
    page: 1,
    pageSize: 10,
    total: 0,
    detail: {},
	personDetail: {}
  },
  getters: {},
  actions: {
	 getCommunity(_,params ){
		 return getCommunityList(params).then(res =>{
	       return res.data
		 })
	 },
	 getHouseCascade(_,params){
		 return getHouseCascade(params).then(res=>{
			 return res.data
		 })
	 },
    async getList({ commit, state }, params) {
      uni.showLoading({ mask: true });
      let result = [];
      try {
        const { data = {} } = await getList({
          pageSize: state.pageSize,
          ...params,
        });
        result = data.rows || [];
        const list = result.map(item => ({
          id: item.idCar,
          name: item.name,
          imageUrl: item.txurl,
          address: `${item.communityName}${item.buildingName}${item.unitName}${item.houseNo}`,
          phone: item.phone,
		  education: item.education,
		  relation: item.relation,
		  birth: item.birth,
		  wz: item.address,
		  phone: item.phone
		  
        }));
        commit('setList', {
          list: params.page === 1 ? list : [...state.list, ...list],
          total: data.total,
        });
      } catch (e) {
        // TODO handle the exception
        console.log(e);
        if (e.message) {
          uni.showToast({ title: e.message, icon: 'none' });
        }
      }
      uni.hideLoading();
      return result;
    },
  },
  mutations: {
    setPage(state, page) {
      state.page = page;
    },
	setState(state,payload){
		state.personDetail = payload
	},
    setList(state, { list, total }) {
      state.list = list;
      state.total = total;
    },
    setDetail(state, detail) {
      state.detail = { ...detail };
    },
  },
};
