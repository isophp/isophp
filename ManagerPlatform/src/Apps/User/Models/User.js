import {adminApiGate} from '../../../services/api';
// todo 如何简化
const defaultParams = {
    module: 'User',
    handler: 'User',
};
export default {
    namespace: 'User',
    state: {
        data: {
            list: [],
            pagination: {},
        },
        loading: false,
        currentUser: {
            userInfo: null,
            auth: null,
        },
    },

    effects: {
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
        * getCurUser(_, {call, put}) {
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'getCurUser',
            });
            yield put({
                type: 'saveCurrentUser',
                payload: response.data,
            });
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                data: action.payload,
            };
        },
        changeLoading(state, action) {
            return {
                ...state,
                loading: action.payload,
            };
        },
        saveCurrentUser(state, action) {
            return {
                ...state,
                currentUser: action.payload,
            };
        },
        changeNotifyCount(state, action) {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifyCount: action.payload,
                },
            };
        },
    },
};
