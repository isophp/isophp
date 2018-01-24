/**
 * Created by liushuai on 2018/1/14.
 */
import {adminApiGate} from '../../../services/api';
// todo 如何简化
const defaultParams = {
    module: 'Article',
    handler: 'Article',
};
export default {
    namespace: 'Article',
    state: {
        id: 0,
        loading: false,
    },
    effects: {
        * add({ payload,success}, {select, call, put}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'add',
                payload: payload
            });
            if (!response) {
                return;
            }
            yield put({
                type: 'save',
                payload: {
                    id: response.data.id
                },
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
            if (success && typeof success === 'function') {
                success();
            }
        },
        * update({ payload,success}, {select, call, put}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'update',
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
        },
        changeLoading(state, action) {
            return {
                ...state,
                loading: action.payload,
            };
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                    if (pathname === '/article/add') {
                    dispatch({type: 'save', payload: {
                        id: 0,
                        loading: false
                    }});
                }
            });
        }
    }
};
