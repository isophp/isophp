import React,{Component, createElement} from 'react';
import { Route } from 'dva/router';
import {connect} from 'dva';
import {Spin} from 'antd';
import styles from './AuthorizeRoute.less';
import {getRouterData} from "../../common/router";
import dynamic from "dva/dynamic";
import {getMenuData} from '../../common/menu';
console.log(getMenuData(),'sssss');
let routerDataCache;
let application;
const setApplication = (app) => (application = app);
const modelNotExisted = (application, model) => (
    // eslint-disable-next-line
    !application._models.some(({namespace}) => namespace === model)
);
// wrapper of dynamic
const dynamicWrapper = (application, models, app, component) => {
    // () => require('module')
    // transformed by babel-plugin-dynamic-import-node-sync
    if (component.toString().indexOf('.then(') < 0) {
        models.forEach((model) => {
            const theModel = require(`../../Apps/${app}/Handlers/${model}`).default
            if (modelNotExisted(application, theModel.namespace)) {
                // eslint-disable-next-line
                application.model(theModel);
            }
        });
        return (props) => {
            return createElement(component().default, {
                ...props,
                routerData: routerDataCache,
            });
        };
    }
};

@connect((state) => ({
    Global: state.Global
}))
class AuthorizeRouteComponent extends Component{
    state = {
    };
    constructor(props){
        super(props);
        const {dispatch} = this.props;
        dispatch({
            type: 'Global/getCurUser'
        });
    };
    render(){
        const {Global:{currentUser:{userInfo, menu}}} = this.props;
        if (true) {
            if (!userInfo) {
                return <Spin size="large" className={styles.globalSpin} />;
            }

            const routerData = {};
            const menuData = [];
            menu.forEach(function (item,index) {
                menuData.push({
                    ...item
                });
                console.log(item);
                if (item.pages) {
                    menuData[index].children=[];
                }
                item.pages.forEach(function (page) {
                    // todo 重复路由判断
                    routerData[page.path] = {
                        path: page.path,
                        name: page.name,
                        component: dynamicWrapper(application, page.handlers, page.app, () => import(`../../Apps/${page.app}/Pages/${page.page}`))
                    };
                    menuData[index].children.push({
                        ...page
                    });
                });
            });
            routerDataCache = routerData;

            const render = [];
            menu.forEach(function (item, index) {
                const Component =() => import(`../../layouts/${item.layout}`);
                const Layout = (props) => {
                    return createElement(Component().default, {
                        ...props,
                        routerData: routerData,
                        menuData: menuData,
                    })
                };
                render.push(
                    <Route
                        key={item.path}
                        path={item.path}
                        render={(props) => <Layout {...props}/>}
                    />
                );
            });
            return (
                <div>
                    {render}
                </div>
            )
        } else {
            return null;
        }
    };
}

export {AuthorizeRouteComponent, setApplication}