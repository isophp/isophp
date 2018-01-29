import {adminApiGate} from '../../../services/api';
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
        changeLayoutCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload,
            };
        },
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
