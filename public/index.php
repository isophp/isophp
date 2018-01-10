<?php

error_reporting(E_ALL);
ini_set('date.timezone','Asia/Shanghai');

require_once '../Framework/bootstrap.php';

// todo 这里需要找更好的方案，并修改到application初始化里
if (empty($_POST)) {
    $postData = file_get_contents('php://input');
    $postData = json_decode($postData, true);
    if (!empty($postData)) {
        $_POST = $postData;
    }
}


$application = new \TopCms\Framework\Applications\HttpApplication();
echo $application->handle()->getContent();
exit;
