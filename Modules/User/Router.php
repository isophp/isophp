<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 04/01/18
 * Time: 09:59
 * Email: ln6265431@163.com
 */

return [
    '/register' => [
        'controller' => 'Index',
        'action' => 'register',
        'auth' => 'any',
    ],
    '/users/login' => [
        'controller' => 'Index',
        'action' => 'login',
        'auth' => 'any',
    ],
    '/logout' => [
        'controller' => 'Index',
        'action' => 'login',
        'auth' => 'any',
    ]
];