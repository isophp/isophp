<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 28/12/17
 * Time: 15:09
 * Email: ln6265431@163.com
 */

// todo
error_reporting(E_ALL);

require_once 'Framework/bootstrap.php';


$loader = new \Phalcon\Loader();
$loader->registerNamespaces([
    'Test' => __DIR__,
]);

require_once dirname(__DIR__) . '/vendor/autoload.php';

$loader->register();