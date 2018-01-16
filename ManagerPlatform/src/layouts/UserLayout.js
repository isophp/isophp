import React,{createElement} from 'react';
import { Link, Route, Switch } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import { getRoutes } from '../utils/utils';
import Login from '../routes/User/Login';


const links = [{
  key: 'help',
  title: '帮助',
  href: '',
}, {
  key: 'privacy',
  title: '隐私',
  href: '',
}, {
  key: 'terms',
  title: '条款',
  href: '',
}];

const copyright = <div>Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品</div>;

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { menu, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    if (menu[pathname] && menu[pathname].name) {
      title = `${menu[pathname].name} - Ant Design Pro`;
    }
    return title;
  }
  render() {
    console.log('ssssss');
    const { routerData, match, menu } = this.props;
    console.log(menu);
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Ant Design</span>
              </Link>
            </div>
            <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
          </div>
            <Switch>
            <Route
                  key={menu.page.path}
                  path={menu.page.path}
                  component={(props) => <Login/>}
                />
            </Switch>
          <GlobalFooter className={styles.footer} links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
