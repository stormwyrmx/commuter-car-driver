import request from '@/utils/request.js';

const listTaskByPageService = (taskPageRequest) => {
    // console.log(taskPageRequest)
    return request({
        url: '/task/page',
        method: 'get',
        params: taskPageRequest
    });
}

const listDriverService = () => {
    return request({
        url: '/driver/all',
        method: 'get'
    });
}


const listBusService = () => {
    return request({
        url: '/bus/all',
        method: 'get'
    });
}

const addTaskService = (taskAddRequest) => {
    return request({
        url: '/task',
        method: 'post',
        data: taskAddRequest
    });
}

const updateTaskService = (taskUpdateRequest) => {
    return request({
        url: '/task',
        method: 'put',
        data: taskUpdateRequest
    });
}

const deleteTaskService = (id) => {
    return request({
        url: '/task/'+id,
        method: 'delete'
    });
}

export {listTaskByPageService,listDriverService,listBusService,addTaskService,deleteTaskService,updateTaskService};