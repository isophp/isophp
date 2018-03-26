<?php
/*
 * Modified: prepend directory path of current file, because of this file own different ENV under between Apache and command line.
 * NOTE: please remove this comment.
 */

return new \Phalcon\Config([
    'environment' => 'PRODUCTION',
    'database' => [
        'adapter'     => 'Mysql',
        'host'        => '127.0.0.1',
        'username'    => 'root',
        'password'    => '19920905',
        'dbname'      => 'isophp',
        'charset'     => 'utf8',
    ],
    'application' => [
        'appName'        => 'iosphp',
        'cacheDir'       => BASE_PATH . '/Cache/',
        'middlewareDir'  => BASE_PATH . '/Middleware/',
        'logDir'         => BASE_PATH . '/Logs/',
        'maxLogs'        => 30,

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
            'path' => '/sys',
            'name' => '系统',
            'icon' => 'dashboard',
            'pages' => [
                [
                    'app' => 'User',
                    'path' => '/sys/index',
                    'page' => 'UserManager',
                    'name' => '系统状态',
                    'handlers' => ['User'],
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
                    'path' => '/article/add',
                    'page' => 'AddArticle',
                    'name' => '发表文章',
                    'handlers' => ['Article','Category'],
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
        ]
    ]
]);
