<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 05/01/18
 * Time: 11:52
 * Email: ln6265431@163.com
 */
namespace TopCms\Framework\Mvc\Applications;

use Phalcon\Cli\Console;
use TopCms\Framework\Mvc\Listeners\BaseServiceListener;
use Phalcon\Di\FactoryDefault\Cli;
use Phalcon\DiInterface;
use Phalcon\Events\Manager;

class ConsoleApplication extends Console
{
    public function __construct(DiInterface $dependencyInjector = null)
    {
        if (empty($dependencyInjector)) {
            $dependencyInjector = new Cli();
        }
        parent::__construct($dependencyInjector);
        $this->bindListeners();
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
        $this->setEventsManager($eventsManager);
    }
}