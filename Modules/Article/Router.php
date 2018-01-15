<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 04/01/18
 * Time: 09:59
 * Email: ln6265431@163.com
 */

return [
    '/article/{id:[a-zA-Z0-9]+}' => [
        'controller' => 'Index',
        'action' => 'detail'
    ]
];