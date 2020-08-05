import request from '@/utils/request';

export const getComplaintType = (params) => request.get('/communityComplaintAdviceApi/getTypeList', { ...params });