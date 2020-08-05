
import request from '@/utils/request';

export const getIndexStatisticsDataForPolice = (params) => request.get('/communityStatisticsApi/getIndexStatisticsDataForPolice', {...params});

export const getList = (params) => request.get('/communityInfoApi/getList', { ...params });

export const switchCommunityDataSource = (params) => request.get('/communityInfoApi/switchCommunityDataSource', { ...params });

