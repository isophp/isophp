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
        'password'    => '',
        'dbname'      => '',
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
]);
