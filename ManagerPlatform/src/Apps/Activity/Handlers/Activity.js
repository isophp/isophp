/**
 * Created by liushuai on 2018/2/21.
 */

import {adminApiGate} from '../../../services/api';
import dealResponse from '../../../utils/dealResponse';

// todo 如何简化
const defaultParams = {
    module: 'Activity',
    handler: 'Activity',
};
export default {
    namespace: 'Activity',
    state: {
        loading: false,
        addLoading: false,
        info: {},
        data: {
            list: [],
            pagination: {},
        },
    },
    effects: {
        * detail({payload, success, fail}, {call, put}){
            yield put({
                type: 'save',
                payload: {
                    addLoading: true
                },
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'detail',
                payload: payload
            });
            yield put({
                type: 'save',
                payload: {
                    info: response.data,
                    addLoading: false
                },
            });
            dealResponse(response, success, fail);

        },
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
            const info = yield select(state => state.Activity.info);

            yield put({
                type: 'save',
                payload: {
                    info: {
                        ...info,
                        id: response.data.id,
                    },
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
                    addLoading: true
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
                    addLoading: false
                },
            });
            dealResponse(response, success, fail);
        },
        * updateStatusByIds({ payload,success, fail}, {select, call, put}) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                },
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'updateStatusByIds',
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
