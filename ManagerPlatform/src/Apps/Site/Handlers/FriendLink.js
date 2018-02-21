/**
 * Created by liushuai on 2018/2/21.
 */

import {adminApiGate} from '../../../services/api';
import dealResponse from '../../../utils/dealResponse';

// todo 如何简化
const defaultParams = {
    module: 'Site',
    handler: 'FriendLink',
};
export default {
    namespace: 'FriendLink',
    state: {
        loading: false,
        addLoading: false,
        data: {
            list: [],
            pagination: {},
        },
    },
    effects: {
        * add({ payload,success, fail}, {select, call, put}) {
            yield put({
                type: 'save',
                payload: {
                    addLoading: true
                },
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'add',
                payload: payload
            });
            yield put({
                type: 'save',
                payload: {
                    addLoading: false
                },
            });
            dealResponse(response, success, fail);
        },
        * list({payload, success, fail}, {call, put}) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                },
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'list',
                payload: payload
            });
            yield put({
                type: 'save',
                payload: {
                    data: response.data
                },
            });
            yield put({
                type: 'save',
                payload: {
                    loading: false
                },
            });
            dealResponse(response, success, fail);
        },
        * update({ payload,success, fail}, {select, call, put}) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                },
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'update',
                payload: payload
            });
            yield put({
                type: 'save',
                payload: {
                    loading: false
                },
            });
            dealResponse(response, success, fail);
        },
        * delete({payload, success}, {call, put}){
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'delete',
                payload: payload
            });
            if (!response) {
                return;
            }
            yield put({
                type: 'save',
                payload: response.data,
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
            if (success && typeof success === 'function') {
                success();
            }
        },
        * clear({payload,success}, {call, put}){
            yield put({
                type: 'save',
                payload: {
                    id: 0,
                    loading: false
                },
            });
        }
    },
    reducers: {
        save(state, action) {
            const info = {
                ...state,
                ...action.payload
            };
            return info;
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                dispatch({type: 'save', payload: {
                    id: 0,
                    loading: false,
                    articleInfo: {}
                }});
            });
        }
    }
};
