/**
 * Created by liushuai on 2018/1/13.
 */
import {adminApiGate} from '../../../services/api';
// todo 如何简化
const defaultParams = {
    module: 'Article',
    handler: 'Category',
};
export default {
    namespace: 'Category',
    state: {
        tree: [],
        data: {
            list: [],
            pagination: {}
        },
        listLoading: false,
        addLoading: false
    },

    effects: {
        * add({payload, success}, {call, put}){
            yield put({
                type: 'save',
                payload: {
                    addLoading: true,
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
            if (response && success && typeof success === 'function') {
                success();
            }
        },
        * list({ payload, callback }, {select, call, put}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'list',
                payload: payload
            });
            yield put({
                type: 'save',
                payload: response.data,
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
        * tree({ payload, callback }, {select, call, put}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'tree',
                payload: payload
            });
            yield put({
                type: 'save',
                payload: {
                    tree: response.data.tree
                }
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        changeLoading(state, action) {
            return {
                ...state,
                loading: action.payload,
            };
        }
    },
};
