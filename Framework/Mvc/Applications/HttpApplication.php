<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 05/01/18
 * Time: 11:40
 * Email: ln6265431@163.com
 */
namespace TopCms\Framework\Mvc\Applications;

use TopCms\Framework\Mvc\Listeners\BaseServiceListener;
use TopCms\Framework\Mvc\Listeners\WebServiceListener;
use Phalcon\Di;
use Phalcon\DiInterface;
use Phalcon\Events\Manager;
use Phalcon\Mvc\Application;

class HttpApplication extends Application
{
    public function __construct(DiInterface $dependencyInjector = null)
    {
        if (empty($dependencyInjector)) {
            $dependencyInjector = new Di();
        }
        parent::__construct($dependencyInjector);
        $this->bindListeners();
        // 这里先的有点作，原本是在boot里初始化，为了兼容测试用例放到这里，后面
        // 找下更好的测试方案，可恢复到boot里
        $this->initial();
    }

    protected function initial()
    {
        $eventManager = $this->getEventsManager();
        $eventManager->fire('application:initial', $this);
    }

    protected function bindListeners()
    {
        $eventsManager = new Manager();
        $baseServiceListener = new BaseServiceListener();
        $eventsManager->attach('application', $baseServiceListener);
        $webServiceListener = new WebServiceListener();
        $eventsManager->attach('application', $webServiceListener);
        $this->setEventsManager($eventsManager);
    }

}