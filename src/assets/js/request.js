import { notification } from 'antd'

import { LOGIN_URL } from 'constants/basic';
import * as http from './http';

async function request(method, url, params) {
    let res;

    try {
        res = await http[method](url, params);
    } catch (e) {
        if (e.errno === 4 && e.data.errno === 502) {

            location.href = LOGIN_URL;
        }

        notification.error({
            message: '提示信息',
            description:  e.data.msg
        });

        throw e;
    }

    return res;
}

export function get(...arg) {
    return request('get', ...arg);
}

export function post(...arg) {
    return request('post', ...arg);
}
