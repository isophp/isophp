import React, {Component} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {Link} from 'dva/router';
import {Checkbox, Alert, Icon} from 'antd';
import Login from '../Components/Login';
import styles from './Login.less';

const {Tab, UserName, Password, Mobile, Captcha, Submit} = Login;

@connect(({Login, loading}) => ({
    Login
}))
export default class LoginPage extends Component {
    state = {
        type: 'account',
        autoLogin: true,
    }

    onTabChange = (type) => {
        this.setState({type});
    }

    handleSubmit = (err, values) => {
        const {type} = this.state;
        if (!err) {
            this.props.dispatch({
                type: 'Login/login',
                payload: {
                    ...values,
                    type,
                },
                success: function () {
                    routerRedux.push('/');
                }
            });
        }
    }

    changeAutoLogin = (e) => {
        this.setState({
            autoLogin: e.target.checked,
        });
    }

    renderMessage = (content) => {
        return (
            <Alert style={{marginBottom: 24}} message={content} type="error" showIcon/>
        );
    }

    render() {
        const {Login: {loading}} = this.props;
        const {type} = this.state;
        return (
            <div className={styles.main}>
                <Login
                    defaultActiveKey={type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                >
                    <Tab key="account" tab="账户密码登录">
                        {
                            this.renderMessage('账户或密码错误（admin/888888）')
                        }
                        <UserName name="identifier" placeholder="username"/>
                        <Password name="credential" placeholder="password"/>
                    </Tab>
                    <Tab key="mobile" tab="手机号登录">
                        {
                            this.renderMessage('验证码错误')
                        }
                        <Mobile name="mobile"/>
                        <Captcha name="captcha"/>
                    </Tab>
                    <div>
                        <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
                        <a style={{float: 'right'}} href="">忘记密码</a>
                    </div>
                    <Submit loading={loading}>登录</Submit>
                </Login>
            </div>
        );
    }
}
