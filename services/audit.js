
import request from '@/utils/request.js';

export const getList = (params) => request.post('/communityResidentReporttApi/getList', { ...params })

export const getAuditedList = (params) => request.post('/communityResidentReporttApi/getAuditedList', { ...params })

export const getDetail = (params) => request.get('/communityResidentReporttApi/getById', { ...params })  

export const updateStatus = (params) => request.post('/communityResidentReporttApi/audit', { ...params })  
