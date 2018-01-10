<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 05/01/18
 * Time: 13:59
 * Email: ln6265431@163.com
 */

define('BASE_PATH', dirname(__DIR__));
define('APP_PATH', dirname(__DIR__) . '/Apps');
define('FW_PATH', __DIR__);

require_once FW_PATH . '/Common/Constant.php';
require_once __DIR__ . '/Common/Func.php';

$loader = new \Phalcon\Loader();
$loader->registerNamespaces([
    'TopCms' => dirname(__DIR__),
]);

require_once dirname(__DIR__) . '/vendor/autoload.php';

$loader->register();