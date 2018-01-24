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
        data: {
            list: [],
        },
        loading: false,
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
        }
    },
};
