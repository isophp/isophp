import React,{Component} from 'react';
import { Router } from 'dva/router';
import {connect} from 'dva';
@connect((state) => ({
    User: state.User
}))
export default class AuthorizeRoute extends Component{
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch({
            type: 'User/getCurUser'
        });
    };
    render(){
        const {User:{userInfo, auth}, layout : Layout, component:Component, render,  ...rest} = this.props;
        console.log(this.props);
        if (!userInfo && !auth) {
            return <Router
                {...this.props}
                {...rest}
                render={props => {...props}}
            />
        }
    };
}