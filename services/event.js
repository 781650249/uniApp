import request from '@/utils/request';

export const getListWithoutSort = (params) => request.post('/eventCenterApi/getListWithoutSort', { ...params });

export const getListWithoutClassify = (params) => request.post('/eventCenterApi/getListWithoutClassify', { ...params });

export const getEventDetail = (params) => request.get('/eventCenterApi/getEventDetail', { ...params });