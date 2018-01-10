import {createElement} from 'react';
import dynamic from 'dva/dynamic';
import {getMenuData} from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
    // eslint-disable-next-line
    !app._models.some(({namespace}) => namespace === model)
    );

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
    // () => require('module')
    // transformed by babel-plugin-dynamic-import-node-sync
    if (component.toString().indexOf('.then(') < 0) {
        models.forEach((model) => {
            const theModel = require(`../Apps/${model}`).default
            if (modelNotExisted(app, theModel.namespace)) {
                // eslint-disable-next-line
                app.model(theModel);
            }
        });
        return (props) => {
            if (!routerDataCache) {
                routerDataCache = getRouterData(app);
            }
            return createElement(component().default, {
                ...props,
                routerData: routerDataCache,
            });
        };
    }
    // () => import('module')
    return dynamic({
        app,
        models: () => models.filter(
            model => modelNotExisted(app, model)).map(m => import(`../Apps/${model}.js`)
        ),
        // add routerData prop
        component: () => {
            if (!routerDataCache) {
                routerDataCache = getRouterData(app);
            }
            return component().then((raw) => {
                const Component = raw.default || raw;
                return props => createElement(Component, {
                    ...props,
                    routerData: routerDataCache,
                });
            });
        },
    });
};

function getFlatMenuData(menus) {
    let keys = {};
    menus.forEach((item) => {
        if (item.children) {
            keys[item.path] = {...item};
            keys = {...keys, ...getFlatMenuData(item.children)};
        } else {
            keys[item.path] = {...item};
        }
    });
    return keys;
}

export const getRouterData = (app) => {
    const routerConfig = {
        '/': {
            component: dynamicWrapper(app, ['User/User',], () => import('../layouts/BasicLayout')),
        },
        '/user/userManager': {
            component: dynamicWrapper(app, [], () => import('../routes/User/UserManager')),
        },
        '/user/roleManager': {
            component: dynamicWrapper(app, [], () => import('../routes/User/RoleManager')),
        },
        '/user/sourceManager': {
            component: dynamicWrapper(app, [], () => import('../routes/User/SourceManager')),
        },
        '/user/roleSourceManager': {
            component: dynamicWrapper(app, [], () => import('../routes/User/RoleSourceManager')),
        },
        '/article/categoryManager': {
            component: dynamicWrapper(app, [], () => import('../routes/Article/CategoryManager')),
        },
        '/article/articleManager': {
            component: dynamicWrapper(app, [], () => import('../routes/Article/ArticleManager')),
        },
        '/auth': {
            component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
        },
        '/auth/login': {
            component: dynamicWrapper(app, [], () => import('../routes/Auth/Login')),
        },
        '/auth/register': {
            component: dynamicWrapper(app, [], () => import('../routes/Auth/Register')),
        },
        '/auth/register-result': {
            component: dynamicWrapper(app, [], () => import('../routes/Auth/RegisterResult')),
        },
        // '/User/:id': {
        //   component: dynamicWrapper(app, [], () => import('../routes/Auth/SomeComponent')),
        // },
    };
    // Get name from ./menu.js or just set it in the router data.
    const menuData = getFlatMenuData(getMenuData());
    const routerData = {};
    Object.keys(routerConfig).forEach((item) => {
        const menuItem = menuData[item.replace(/^\//, '')] || {};
        routerData[item] = {
            ...routerConfig[item],
            name: routerConfig[item].name || menuItem.name,
            authority: routerConfig[item].authority || menuItem.authority,
        };
    });
    return routerData;
};
