import request from '../utils/request';

export async function adminApiGate(params) {
    return request(`http://devel.isophp.cn/adminApiGate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
            ...params,
        }
    });
}
