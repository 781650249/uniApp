import request from '@/utils/request.js';

export const getToken = (params = {}) => request.post('/loginApi/login/token', { ...params });

export const getUserinfo = (params = {}) => request.get('/loginApi/getUserInfo', { ...params });
export const wechatLogin = (params = {}) => request.post('/loginApi/login/weChat', { ...params });