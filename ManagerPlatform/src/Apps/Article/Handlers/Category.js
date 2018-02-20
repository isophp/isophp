/**
 * Created by liushuai on 2018/1/13.
 */
import {adminApiGate} from '../../../services/api';
import {message} from 'antd';
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
        addLoading: false,
        treeLoading: false,
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
            if (response.status == -1) {
                message.warning(response.data.msg);
                return;
            }
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
                payload: {
                    data: response.data
                },
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
        * tree({ payload, success }, {select, call, put}) {
            yield put({
                type: 'save',
                payload: {
                    treeLoading: true
                },
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
                type: 'save',
                payload: {
                    treeLoading: false
                },
            });
            if (success && typeof success === 'function') {
                success();
            }
        },
        * delete({payload, success, fail}, {call, put}){
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
                type: 'changeLoading',
                payload: false,
            });
            if (response.status == -1) {
                message.warning(response.data.msg);
                return;
            }
            if (success && typeof success === 'function') {
                success();
            }
        },
        * cancelDelete({payload, success, fail}, {call, put}){
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'cancelDelete',
                payload: payload
            });
            if (!response) {
                return;
            }
            yield put({
                type: 'changeLoading',
                payload: false,
            });
            if (success && typeof success === 'function') {
                success();
            }
        },
        * update({payload, success, fail}, {call, put}){
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
                type: 'changeLoading',
                payload: false,
            });
            if (response.status == -1 && fail) {
                fail(response.data.msg);
                return;
            } else if (success && typeof success === 'function') {
                success();
            }
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
                listLoading: action.payload,
            };
        }
    },
};
