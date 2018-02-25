import {adminApiGate} from '../../../services/api';
import dealResponse from '../../../utils/dealResponse';

// todo 如何简化
const defaultParams = {
    module: 'User',
    handler: 'Login',
};
export default {
    namespace: 'Login',
    state: {
        loading: false,
        currentUser: {
            userInfo: null,
            menu: [],
        },
    },

    effects: {
        * logout({payload, success, fail}, {call, put}){
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'logout',
                payload: payload
            });
            window.location = '/';
        },
        * login({payload, success, fail}, {call, put}) {
            yield put({
                type: 'loading',
                payload: true
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'login',
                payload: payload
            });
            yield put({
                type: 'loading',
                payload: false
            });
            dealResponse(response, success, fail);
        },
        * getCurUser({success, fail, goLogin, hasLogin}, {call, put}) {
            yield put({
                type: 'loading',
                payload: true
            });
            const response = yield call(adminApiGate, {
                ...defaultParams,
                method: 'getCurUser',
            });
            yield put({
                type: 'loading',
                payload: false
            });
            yield put({
                type: 'saveCurrentUser',
                payload: response.data,
            });
            if (goLogin && response.data.userInfo == false) {
                goLogin();
            }
            if (hasLogin && response.data.userInfo != false) {
                hasLogin();
            }
        },
    },

    reducers: {
        loading(state, action) {
            return {
                ...state,
                loading: action.payload
            }
        },
        save(state, action) {
            return {
                ...state,
                data: action.payload,
            };
        },
        saveCurrentUser(state, action) {
            return {
                ...state,
                currentUser: action.payload,
            };
        },
    },
};
