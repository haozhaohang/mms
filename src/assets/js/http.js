import 'whatwg-fetch';

const netErrorStatu = 1;    // 网络错误
const serverErrorStatu = 2;    // 服务器错误
const formatErrorStatu = 3;    // 数据格式错误
const logicErrorStatu = 4;    // 业务逻辑错误

const errorMsg = {
    [netErrorStatu]: '网络错误',
    [serverErrorStatu]: '服务器错误',
    [formatErrorStatu]: '数据格式错误',
    [logicErrorStatu]: '业务逻辑错误'
};

class CustomFetchError {
    constructor(errno, data) {
        this.errno = errno;
        this.msg = errorMsg[errno];
        this.data = data;
    }
}

export function buildQuery(data) {
    const toString = Object.prototype.toString;

    const res = Object.entries(data).reduce((pre, [key, value]) => {
        let newValue;

        if (Array.isArray(value) || toString.call(value) === '[object Object]') {
            newValue = JSON.stringify(value);
        } else {
            newValue = (value === null || value === undefined) ? '' : value;
        }

        pre.push(`${key}=${encodeURIComponent(newValue)}`);

        return pre;
    }, []);

    return res.join('&');
}

export async function request(input, opt) {
    const init = Object.assign({
        credentials: 'include'
    }, opt);

    let res;
    try {
        res = await fetch(input, init);
    } catch (e) {
        throw new CustomFetchError(netErrorStatu, e);
    }

    if (!res.ok) {
        throw new CustomFetchError(serverErrorStatu, res);
    }

    let data;

    try {
        data = await res.json();
    } catch (e) {
        throw new CustomFetchError(formatErrorStatu, e);
    }

    if (!data || data.errno !== 0) {
        throw new CustomFetchError(logicErrorStatu, data);
    }

    return data.data;
}

export function get(url, params = {}, opt = {}) {
    const init = Object.assign({
        method: 'GET',
    }, opt);

    // ajax cache
    // Object.assign(params, {
    //     timestamp: new Date().getTime()
    // });

    const paramsStr = buildQuery(params);

    const urlWithQuery = url + (paramsStr ? `?${paramsStr}` : '');

    return request(urlWithQuery, init);
}

export function post(url, params = {}, opt = {}) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const init = Object.assign({
        method: 'POST',
        body: buildQuery(params),
        headers
    }, opt);

    return request(url, init);
}

export function uploadFile(url, params, opt) {
    const data = new FormData();

    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined) {
            return;
        }

        if (params.filename && key === 'imgFile') {
            data.append(key, value, params.filename);
        } else {
            data.append(key, value);
        }
    });

    const init = Object.assign({
        method: 'POST',
        body: data
    }, opt);

    return request(url, init);
}

export default {
    buildQuery,
    request,
    get,
    post,
    uploadFile
};
