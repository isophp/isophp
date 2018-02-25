import React from 'react';
import { Router, Switch, routerRedux, Redirect } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import styles from './index.less';
import {AuthorizeRouteComponent, setApplication} from './components/Auth/AuthorizeRoute';
import UserLayout from './layouts/UserLayout';
import Login from './components/Login';

const { ConnectedRouter } = routerRedux;

// const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
    setApplication(app);
    return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
            <Redirect exact from="/" to="/article/category" />
            <AuthorizeRouteComponent history={history}
              path={'/'}
          />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
