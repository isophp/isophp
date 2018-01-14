const menuData = [
    {
        name: '用户管理',
        icon: 'user',
        path: 'user',
        children: [
            {
                name: '用户管理',
                path: 'UserManager',
            },
            {
                name: '角色管理',
                path: 'RoleManager',
            },
            {
                name: '资源管理',
                path: 'SourceManager',
            },
            {
                name: '角色资源',
                path: 'RoleSourceManager',
            }
        ]
    },
    {
        name: '文章',
        icon: 'dashboard',
        path: 'article',
        children: [{
            name: '新建文章',
            path: 'add'
        },{
            name: '栏目管理',
            path: 'categoryManager',
        }, {
            name: '文章管理',
            path: 'articleManager',
        }
        ],
    },
    {
        name: '账户',
        icon: 'auth',
        path: 'auty',
        authority: 'guest',
        children: [{
            name: '登录',
            path: 'login',
        }, {
            name: '注册',
            path: 'register',
        }, {
            name: '注册结果',
            path: 'register-result',
        }],
    }];

function formatter(data, parentPath = '', parentAuthority) {
    return data.map((item) => {
        const result = {
            ...item,
            path: `${parentPath}${item.path}`,
            authority: item.authority || parentAuthority,
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
