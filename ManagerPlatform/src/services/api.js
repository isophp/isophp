import request from '../utils/request';

export async function adminApiGate(params) {
    return request(`/adminApiGate`, {
        method: 'POST',
        body: {
            ...params,
        }
    });
}