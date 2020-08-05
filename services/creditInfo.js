
import request from '@/utils/request.js';

export const getPersonInfoByPid = (params) => request.post('/personInfo/getPersonInfoByPid', { ...params })

export const getRelationEntity = (params) => request.get('/videoArchivesApi/getRelationEntity', { ...params })

export const getTrajectory = (params) => request.post('/modelColleaguesApi/getTrajectory', { ...params })

export const faceIdentify = (params) => request.post('/autoIdentifyApi/faceIdentifyV2', { ...params })

