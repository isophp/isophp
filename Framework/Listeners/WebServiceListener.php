<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 05/01/18
 * Time: 13:22
 * Email: ln6265431@163.com
 */
namespace TopCms\Framework\Listeners;

use Phalcon\Mvc\Application;
use Phalcon\DiInterface;
use Phalcon\Events\Event;
use Phalcon\Events\Manager;
use Phalcon\Http\Request;
use Phalcon\Http\Response;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Mvc\Router;
use Phalcon\Mvc\Url;
use Phalcon\Mvc\View;
use Phalcon\Session\Adapter\Files as SessionAdapter;

class WebServiceListener
{
    public function initial(Event $event, Application $application)
    {
        $di = $application->getDI();
        $this->registerService($di);
        $this->registerModules($di, $application);
    }

    public function viewRender(Event $event, Application $application)
    {
    }

    public function beforeHandleRequest(Event $event, Application $application)
    {
    }

    public function afterHandleRequest(Event $event, Application $application)
    {
    }


    /**
     * @param DiInterface $di
     */
    protected function registerService($di)
    {
        $this->registerView($di);
        $this->registerRouter($di);
        $this->registerHttpService($di);
        $this->registerDispatcher($di);
        $this->registerUrl($di);
        $this->registerFlash($di);
        $this->registerSession($di);
    }

    /**
     * @param DiInterface $di
     */
    protected function registerDispatcher($di)
    {
        $di->setShared('dispatcher', function () {
            $eventsManager = new Manager();
            $eventsManager->attach(
                "dispatch:beforeException",
                function (Event $event, $dispatcher, \Exception $exception) {
                    switch ($exception->getCode()) {
                        case Dispatcher::EXCEPTION_HANDLER_NOT_FOUND:
                        case Dispatcher::EXCEPTION_ACTION_NOT_FOUND:
                            $dispatcher->forward(
                                [
                                    'namespace' => 'TopCms\\Modules\\Sys\\Controllers',
                                    "controller" => "index",
                                    "action" => "show404",
                                ]
                            );
                            return false;
                    }
                }
            );
            $dispatcher = new Dispatcher();
            $dispatcher->setEventsManager($eventsManager);
            return $dispatcher;
        });
    }


    /**
     * @param DiInterface $di
     */
    protected function registerHttpService($di)
    {
        $di->setShared('request', function () {
            return new Request();
        });

        $di->setShared('response', function () {
            return new Response();
        });

        $di->setShared('cookie', function () {
            return new Response\Cookies();
        });

        $di->setShared('request', function () {
            return new Request();
        });
    }

    /**
     * @param DiInterface $di
     */
    protected function registerRouter($di)
    {
        $router = new Router();
        $router->setUriSource(\Phalcon\Mvc\Router::URI_SOURCE_SERVER_REQUEST_URI);
        $di->setShared('router', $router);
    }

    /**
     * @param DiInterface $di
     */
    protected function registerSession($di)
    {
        $di->setShared('session', function () {
            $session = new SessionAdapter();
            $session->start();
            return $session;
        });

    }

    /**
     * @param DiInterface $di
     */
    protected function registerView($di)
    {
        $di->setShared('view', function () {
            $view = new View();
            $view->setViewsDir(BASE_PATH . '/Views');
            $view->registerEngines([
                '.volt' => function ($view) {
                    $config = $this->getConfig();

                    $volt = new View\Engine\Volt($view, $this);
                    // todo cache文件不存在的时候mkdir
                    $volt->setOptions([
                        'compiledPath' => $config->application->cacheDir,
                        'compiledSeparator' => '_'
                    ]);

                    return $volt;
                },
                '.phtml' => View\Engine\Php::class

            ]);

            return $view;
        });
    }

    /**
     * @param DiInterface $di
     */
    protected function registerFlash($di)
    {
        $di->setShared('flash', function () {
            return new Flash([
                'error' => 'alert alert-danger',
                'success' => 'alert alert-success',
                'notice' => 'alert alert-info',
                'warning' => 'alert alert-warning'
            ]);
        });
    }

    /**
     * @param DiInterface $di
     */
    protected function registerUrl($di)
    {
        $di->setShared('url', function () {
            $config = $this->getConfig();

            $url = new Url();
            $url->setBaseUri($config->application->baseUri);

            return $url;
        });
    }

    /**
     * @param DiInterface $di
     * @param \Phalcon\Mvc\Application $application
     */
    protected function registerModules($di, $application)
    {
        $moduleList = glob(BASE_PATH . '/Modules/*');
        $modules = [];
        $router = $di->getRouter();
        foreach ($moduleList as $modulePath) {
            if (!is_dir($modulePath)) {
                continue;
            }
            $moduleName = basename($modulePath);
            $modules[$moduleName] = [
                'className' => 'TopCms\\Modules\\' . $moduleName . '\\Module',
                'path' => $modulePath . '/Module.php',
            ];


            $moduleRouters = require $modulePath . '/Router.php';
            // todo 这里作路由唯一性判断避免模块之间有重复路由！！
            foreach ($moduleRouters as $path => $item) {
                $item['module'] = $moduleName;
                $router->add($path, $item);
            }
        }
//        $router->setDefaultModule('Sys');
        $application->registerModules($modules);
    }
}