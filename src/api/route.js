import request from '@/utils/request.js';

const getRouteByIdService = (id) => {
    return request({
        url: '/route/'+id,
        method: 'get',
    });
}

export {getRouteByIdService};