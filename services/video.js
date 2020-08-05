import request from '@/utils/request';


export const getPlayLiveVideoUrl = (params) => request.post('/videoPlay/getPlayLiveVideoUrl', { ...params });



export const selectCameraListByCommunity = (params) => request.post('/videoSchedulApi/selectCameraListByCommunity', { ...params });


export const getList = (params) => request.get('/communityInfoApi/getList', { ...params });
