<?php

error_reporting(E_ALL);
ini_set('date.timezone','Asia/Shanghai');

require_once '../Framework/bootstrap.php';

$application = new \TopCms\Framework\Applications\HttpApplication();
echo $application->handle()->getContent();
exit;
