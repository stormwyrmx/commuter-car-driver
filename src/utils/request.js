//定制请求的实例
//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus'
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({baseURL})

//添加响应拦截器
instance.interceptors.response.use(
    result => {
        //如果业务状态码为200，代表本次操作成功
        if (result.data.code === 200) {
            return result.data;
        }
        //代表业务状态码不是0，本次操作失败
        ElMessage.error(result.data.message?result.data.message:'服务异常')
        return Promise.reject(result.data);//异步的状态转化成失败的状态
    },
    err => {
        alert('服务异常');
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)
export default instance;