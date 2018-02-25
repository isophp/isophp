import React from 'react';
import PropTypes from 'prop-types';
import {Layout, Icon, message} from 'antd';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import {Route, Redirect, Switch} from 'dva/router';
import {ContainerQuery} from 'react-container-query';
import classNames from 'classnames';
import {enquireScreen} from 'enquire-js';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import NotFound from '../routes/Exception/404';
import {getRoutes} from '../utils/utils';
import Authorized from '../utils/Authorized';
import logo from '../assets/logo.svg';
import {routerRedux} from 'dva/router';

const {Content} = Layout;
const {AuthorizedRoute} = Authorized;


const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
    },
};

let isMobile;
enquireScreen((b) => {
    isMobile = b;
});

class BasicLayout extends React.PureComponent {
    static childContextTypes = {
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object,
    };
    state = {
        isMobile,
    };

    getChildContext() {
        const {location, routerData} = this.props;
        return {
            location,
            breadcrumbNameMap: routerData,
        };
    };

    componentDidMount() {
        enquireScreen((mobile) => {
            this.setState({
                isMobile: mobile,
            });
        });
    };

    getPageTitle() {
        const {routerData, location} = this.props;
        const {pathname} = location;
        let title = 'ISOPHP社区';
        if (routerData[pathname] && routerData[pathname].name) {
            title = `${routerData[pathname].name} - ISOPHP社区`;
        }
        return title;
    }

    handleMenuCollapse = (collapsed) => {
        this.props.dispatch({
            type: 'Global/changeLayoutCollapsed',
            payload: collapsed,
        });
    };
    handleNoticeClear = (type) => {
        message.success(`清空了${type}`);
        this.props.dispatch({
            type: 'Global/clearNotices',
            payload: type,
        });
    };
    handleMenuClick = ({key}) => {
        if (key === 'logout') {
            this.props.dispatch({
                type: 'Login/logout'
            });
        }
    };
    handleNoticeVisibleChange = (visible) => {
        if (visible) {
            this.props.dispatch({
                type: 'Global/fetchNotices',
            });
        }
    };

    render() {
        const {
            currentUser, collapsed, fetchingNotices, notices, routerData, menuData, match, location,
        } = this.props;
        const layout = (
            <Layout>
                <SiderMenu
                    logo={'./image/logo.png'}
                    // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
                    // If you do not have the Authorized parameter
                    // you will be forced to jump to the 403 interface without permission
                    Authorized={Authorized}
                    menuData={menuData}
                    collapsed={collapsed}
                    location={location}
                    isMobile={this.state.isMobile}
                />
                <Layout>
                    <GlobalHeader
                        logo={'./image/logo.png'}
                        currentUser={currentUser}
                        fetchingNotices={fetchingNotices}
                        notices={notices}
                        collapsed={collapsed}
                        isMobile={this.state.isMobile}
                        onNoticeClear={this.handleNoticeClear}
                        onCollapse={this.handleMenuCollapse}
                        onMenuClick={this.handleMenuClick}
                        onNoticeVisibleChange={this.handleNoticeVisibleChange}
                    />
                    <Content style={{margin: '24px 24px 0', height: '100%'}}>
                        <div style={{minHeight: 'calc(100vh - 260px)'}}>
                            <Switch>
                                {
                                    getRoutes(match.path, routerData).map(item =>
                                        (
                                            <Route
                                                key={item.key}
                                                path={item.path}
                                                component={item.component}
                                                redirectPath="/exception/403"
                                            />
                                        )
                                    )
                                }
                                <Route render={NotFound}/>
                            </Switch>
                        </div>
                        <GlobalFooter
                            links={[{
                                key: 'Pro 首页',
                                title: 'Pro 首页',
                                href: 'http://pro.ant.design',
                                blankTarget: true,
                            }, {
                                key: 'github',
                                title: <Icon type="github"/>,
                                href: 'https://github.com/ant-design/ant-design-pro',
                                blankTarget: true,
                            }, {
                                key: 'Ant Design',
                                title: 'Ant Design',
                                href: 'http://ant.design',
                                blankTarget: true,
                            }]}
                            copyright={
                                <div>
                                    Copyright <Icon type="copyright"/> 2018 ISOPHP社区
                                </div>
                            }
                        />
                    </Content>
                </Layout>
            </Layout>
        );

        return (
            <DocumentTitle title={this.getPageTitle()}>
                <ContainerQuery query={query}>
                    {params => <div className={classNames(params)}>{layout}</div>}
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}

export default connect(({User, Global, loading}) => ({
    collapsed: Global.collapsed,
    fetchingNotices: loading.effects['Global/fetchNotices'],
    notices: Global.notices,
}))(BasicLayout);
