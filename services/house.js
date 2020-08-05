import request from '@/utils/request';


 
 




//获取所有住户信息列表（app公安侧)
export const getList = (params) => request.post('/communityManageApi/getFullPersonListByHouse', { ...
	params
});

// 获取小区列表
export const getCommunityList = (params = {}) => {
  return request.get('/communityInfoApi/getList', { ...params });
};

//获取楼栋级联信息
export const getHouseCascade = (params = {}) => {
  return request.get('/communityManageApi/getBuildingCascade', { ...params });
};


// export const getDetail = (params = {}) => {
// 	return request.post('/communityManageApi/getPersonnelById', {
// 		pageNum,
// 		...body
// 	});
// }
