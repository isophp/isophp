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

const copyright = <div>Copyright <Icon type="copyright" /> 2018 ISOPHP团队出品</div>;

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'ISOPHP';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ISOPHP`;
    }
    return title;
  }
  render() {
    const { routerData, match, menu } = this.props;
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
            <div className={styles.desc}>ISOPHP社区</div>
          </div>
            <Switch>
                {
                    getRoutes(match.path, routerData).map(item =>
                        (
                            <Route
                                key={item.key}
                                component={item.component}
                                redirectPath="/exception/403"
                            />
                        )
                    )
                }
            </Switch>
          <GlobalFooter className={styles.footer} links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
