<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 27/12/17
 * Time: 13:51
 */

// todo
error_reporting(E_ALL);

require_once dirname(__DIR__) . '/Framework/bootstrap.php';

$loader = new \Phalcon\Loader();
$loader->registerDirs([
    __DIR__ . "/Tasks",
]);
$loader->register();

/**
 * 处理console应用参数
 */
$arguments = [];

foreach ($argv as $k => $arg) {
    if ($k === 1) {
        $arguments["task"] = $arg;
    } elseif ($k === 2) {
        $arguments["action"] = $arg;
    } elseif ($k >= 3) {
        $arguments["params"][] = $arg;
    }
}

$console = new \Framework\Applications\ConsoleApplication();

try {
    // 处理参数
    $console->handle($arguments);
} catch (\Phalcon\Exception $e) {
    echo $e->getMessage();

    exit(255);
}