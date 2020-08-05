import request from '@/utils/request';

export const getNoticeList = (params) => request.post('/communityAnnouncementApi/getList', {...params});




