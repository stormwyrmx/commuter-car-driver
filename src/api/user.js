import request from '@/utils/request.js';

const registerService = (registerRequest)=> {
    return request({
        url: '/user/register',
        method: 'post',
        data: registerRequest
    });
}

const loginService = (loginData)=> {
    return request({
        url: '/auth/login',
        method: 'post',
        data: loginData
    });
}

export {registerService,loginService};