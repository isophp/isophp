<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 04/01/18
 * Time: 13:38
 * Email: ln6265431@163.com
 */
namespace TopCms\Modules;
use Phalcon\DiInterface;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Mvc\ModuleDefinitionInterface;

abstract class BaseModule implements ModuleDefinitionInterface
{

    protected $moduleName;

    public function __construct()
    {
    }

    /**
     * @param DiInterface|null $di
     */
    public function registerAutoloaders(DiInterface $di = null)
    {

    }

    /**
     * @param DiInterface $di
     */
    public function registerServices(DiInterface $di)
    {
        $moduleName = $di->getShared("router")->getModuleName();
        // Registering a dispatcher
        $di->set(
            "dispatcher",
            function () use($moduleName) {

                $dispatcher = new Dispatcher();

                $dispatcher->setDefaultNamespace('TopCms\\Modules\\' . $moduleName . '\\Controllers');

                return $dispatcher;
            }
        );
    }
}