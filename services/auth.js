import request from '@/utils/request';

export const getToken = (params) => request.post('/loginApi/login/token', { ...params });

export const getUserinfo = (params) => request.get('/loginApi/getUserInfo', { ...params });

export const getCommunityInfo = (params) => request.post('/communityInfoApi/getCommunityInfo', {...params});


export const getList = (params) => request.get('/communityInfoApi/getList', {...params});

