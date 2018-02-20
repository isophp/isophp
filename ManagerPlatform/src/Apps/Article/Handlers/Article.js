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
        loading: false,
        listLoading: false,
        articleInfo: {
            content: '',
            categoryId: null,
            id: 0
        },
        data: {
            list: [],
            pagination: {},
        },
    },
    effects: {
        * updateStatusByIds({payload, success}, {call, put}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'updateStatusByIds',
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
        * detail({payload, success}, {call, put}) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'detail',
                payload: payload
            });
            if (!response) {
                return;
            }
            yield put({
                type: 'save',
                payload: {
                    articleInfo: response.data
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
            const articleInfo = yield select(state => state.Article.articleInfo);
            yield put({
                type: 'save',
                payload: {
                    articleInfo: {
                        ...articleInfo,
                        id: response.data.id
                    }
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
        * list({payload, success}, {call, put}) {
            yield put({
                type: 'save',
                payload: {
                    listLoading: true
                },
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'list',
                payload: payload
            });
            if (!response) {
                return;
            }
            yield put({
                type: 'save',
                payload: {
                    data: response.data
                },
            });
            yield put({
                type: 'save',
                payload: {
                    listLoading: false
                },
            });

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
                dispatch({type: 'save', payload: {
                    id: 0,
                    loading: false,
                    articleInfo: {}
                }});
            });
        }
    }
};
