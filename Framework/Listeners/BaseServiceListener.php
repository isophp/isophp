<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 05/01/18
 * Time: 13:22
 * Email: ln6265431@163.com
 */
namespace TopCms\Framework\Listeners;
use TopCms\Framework\Exceptions\ExceptionHandler;
use TopCms\Framework\Exceptions\SysException;
use Phalcon\Application;
use Phalcon\DiInterface;
use Phalcon\Events\Event;
use Phalcon\Mvc\Model\Manager;
use Phalcon\Mvc\Model\MetaData\Memory;

class BaseServiceListener
{
    public function initial(Event $event, Application $application)
    {
        $di = $application->getDI();
        $this->registerExceptionHandler();
        $this->registerService($di);
        $this->registerConstant($di);
    }

    /**
     * @param $di
     * @throws SysException
     */
    protected function registerConstant($di)
    {
        $environment = $di->getConfig()->environment;
        if (empty($environment)) {
            throw new SysException('can\'t find environment filed in the config file');
        }
        if (!defined('ENVIRONMENT')) {
            define('ENVIRONMENT', $environment);
        }
    }

    protected function registerExceptionHandler()
    {
        $handlerClass = new ExceptionHandler();
        set_error_handler([$handlerClass, 'handleError']);
        set_exception_handler([$handlerClass, 'handleException']);
        register_shutdown_function([$handlerClass, 'handleShutDown']);
    }

    /**
     * @param DiInterface $di
     */
    protected function registerService($di)
    {
        $this->registerConfig($di);
        $this->registerDb($di);
        $this->registerModelsMetaAndManager($di);
    }

    /**
     * @param DiInterface $di
     */
    protected function registerModelsMetaAndManager($di)
    {
        // todo 设置缓存
        $di->setShared('modelsMetadata', function () {
            return new Memory();
        });
        $di->setShared('modelsManager', function (){
            return new Manager();
        });
    }

    /**
     * @param DiInterface $di
     */
    protected function registerDb($di)
    {
        // todo 多库
        $di->setShared('db', function () {
            $config = $this->getConfig();

            $class = 'Phalcon\Db\Adapter\Pdo\\' . $config->database->adapter;
            $params = [
                'host'     => $config->database->host,
                'username' => $config->database->username,
                'password' => $config->database->password,
                'dbname'   => $config->database->dbname,
                'charset'  => $config->database->charset
            ];

            if ($config->database->adapter == 'Postgresql') {
                unset($params['charset']);
            }

            $connection = new $class($params);
            return $connection;
        });
    }

    /**
     * @param DiInterface $di
     */
    public function registerConfig($di)
    {
        $di->setShared('config', function () {
            $config = include BASE_PATH . '/Config/config.php';
            if (is_readable(BASE_PATH . '/Config/config.dev.php')) {
                $override = include BASE_PATH . '/Config/config.dev.php';
                $config->merge($override);
            }
            return $config;
        });
    }
}