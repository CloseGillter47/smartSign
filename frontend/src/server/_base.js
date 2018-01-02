import axios from 'axios'
import qs from 'qs'
import os from 'os'

// axios 配置
axios.defaults.timeout = 5000;

const port = process.env.PORT || 4800;
const baseURL = 'http://' + os.hostname() + ':' + port
axios.defaults.baseURL = baseURL;

//POST传参序列化
axios.interceptors.request.use(

    config => {

        // config.data = qs.stringify(config.data);

        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

        return config;
    }, (error) => {
        return Promise.reject(error);
    });

//返回状态判断
axios.interceptors.response.use((res) => {
    //data.success是后台返回的字段，必须统一，不然前端这里拿不到数据
    if (!res) {
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});

/**
 * POST请求
 */

export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**
 * GET请求
 */
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: param
        })
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
