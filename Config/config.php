<?php
/*
 * Modified: prepend directory path of current file, because of this file own different ENV under between Apache and command line.
 * NOTE: please remove this comment.
 */

return new \Phalcon\Config([
    'environment' => 'PRODUCTION',
    'database' => [
        'adapter' => 'Mysql',
        'host' => '127.0.0.1',
        'username' => 'root',
        'password' => '',
        'dbname' => '',
        'charset' => 'utf8',
    ],
    'application' => [
        'appName' => 'iosphp',
        'cacheDir' => BASE_PATH . '/Cache/',
        'middlewareDir' => BASE_PATH . '/Middleware/',
        'logDir' => BASE_PATH . '/Logs/',
        'maxLogs' => 30,

        // This allows the baseUri to be understand project paths that are not in the root directory
        // of the webpspace.  This will break if the public/index.php entry point is moved or
        // possibly if the web server rewrite rules are changed. This can also be set to a static path.
        'baseUri' => '/',
    ],
    'article' => [
        'idSalt' => '&YGFVBI&^%$',
        'minLength' => 12,
    ],
    'roles' => [
        'admin',
        'writer',
        'guest',
        'User',
        'any'
    ],
    'guestMenu' => [
        [
            'layout' => 'UserLayout',
            'path' => '/',
            'name' => '登录',
            'icon' => 'user',
            'pages' => [
                [
                    'app' => 'User',
                    'path' => '/login',
                    'page' => 'Login',
                    'name' => '登录',
                    'handlers' => ['User'],
                    'icon' => 'team'
                ]
            ]
        ]
    ],
    'menu' => [
        [
            'layout' => 'BasicLayout',
            'path' => '/user',
            'name' => '用户',
            'icon' => 'user',
            'pages' => [
                [
                    'app' => 'User',
                    'path' => '/user/manager',
                    'page' => 'UserManager',
                    'name' => '用户管理',
                    'handlers' => ['User'],
                    'icon' => 'team'
                ]
            ]
        ],
        [
            'layout' => 'BasicLayout',
            'path' => '/site',
            'name' => '系统',
            'icon' => 'dashboard',
            'pages' => [
                [
                    'app' => 'User',
                    'path' => '/site/index',
                    'page' => 'UserManager',
                    'name' => '系统状态',
                    'handlers' => ['User', 'Role'],
                    'icon' => 'profile'
                ],
                [
                    'app' => 'Site',
                    'path' => '/site/friendLink',
                    'page' => 'FriendLink',
                    'name' => '友情链接',
                    'handlers' => ['FriendLink'],
                    'icon' => 'profile'
                ]
            ]
        ],
        [
            'layout' => 'BasicLayout',
            'path' => '/article',
            'name' => '文章',
            'icon' => 'book',
            'pages' => [
                [
                    'app' => 'Article',
                    'path' => '/article/category',
                    'page' => 'CategoryManager',
                    'name' => '栏目管理',
                    'handlers' => ['Category'],
                    'icon' => 'folder-add',
                ],
                [
                    'app' => 'Article',
                    'key' => '/article/add/',
                    'path' => '/article/add/:articleId?',
                    'page' => 'AddArticle',
                    'name' => '发表文章',
                    'handlers' => ['Article', 'Category'],
                    'icon' => 'edit',
                ],
                [
                    'app' => 'Article',
                    'path' => '/article/manage',
                    'page' => 'ArticleManager',
                    'name' => '文章管理',
                    'handlers' => ['Article'],
                    'icon' => 'file-add'
                ]
            ]
        ],
        [
            'layout' => 'BasicLayout',
            'path' => '/openSource',
            'name' => '开源项目',
            'icon' => 'user',
            'pages' => [
                [
                    'app' => 'OpenSource',
                    'path' => '/openSource/manager',
                    'page' => 'OpenSourceManager',
                    'name' => '开源项目管理',
                    'handlers' => ['OpenSource'],
                    'icon' => 'team'
                ],
                [
                    'app' => 'OpenSource',
                    'key' => '/openSource/add/',
                    'path' => '/openSource/add/:openSourceId?',
                    'page' => 'AddOpenSource',
                    'name' => '添加开源项目',
                    'handlers' => ['OpenSource'],
                    'icon' => 'edit',
                ]
            ]
        ],
        [
            'layout' => 'BasicLayout',
            'path' => '/activity',
            'name' => '活动',
            'icon' => 'user',
            'pages' => [
                [
                    'app' => 'Activity',
                    'path' => '/activity/manager',
                    'page' => 'ActivityManager',
                    'name' => '活动管理',
                    'handlers' => ['Activity'],
                    'icon' => 'team'
                ],
                [
                    'app' => 'Activity',
                    'key' => '/activity/add/',
                    'path' => '/activity/add/:activityId?',
                    'page' => 'AddActivity',
                    'name' => '添加开源项目',
                    'handlers' => ['Activity'],
                    'icon' => 'edit',
                ]
            ]
        ]
    ]
]);
