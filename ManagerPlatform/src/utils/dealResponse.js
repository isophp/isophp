/**
 * Created by liushuai on 2018/2/21.
 */
import {message} from 'antd';

function showMsg(response, success) {
    if (!response.data.msg) {
        return;
    }
    let msg = response.data.msg;
    if (Array.isArray(msg)) {
        msg = msg.join();
    }
    if (success) {
        message.success(msg);
    } else {
        message.error(msg);
    }
}

export default function dealResponse(response, success, fail)
{
    if (!response) {
        return;
    }
    if (response.status === 0) {
        if (success) {
            success();
        } else {
            showMsg(response, true);
        }
    } else if (response.status === -1) {
        showMsg(response, false);
        if (fail) {
            fail();
        }
    }
}