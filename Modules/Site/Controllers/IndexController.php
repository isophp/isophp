<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/6下午10:42
 */
namespace TopCms\Modules\Site\Controllers;

use TopCms\Framework\Mvc\Controller\BaseController;
use TopCms\Framework\Exceptions\ApiUnauthorizedException;

/**
 * Class IndexController
 */
class IndexController extends BaseController
{
    public function indexAction()
    {
        $this->view->pick('pages/index/index');
    }

    public function show404Action()
    {
        echo '404';
    }
}