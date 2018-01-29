<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/6下午10:42
 */
namespace TopCms\Modules\Sys\Controllers;

use TopCms\Framework\Mvc\Controller\BaseController;
use TopCms\Framework\Exceptions\ApiUnauthorizedException;

/**
 * Class IndexController
 */
class IndexController extends BaseController
{

    // todo 接口
    public function testAction()
    {
        $this->successJson([
            'msg' => 'test controller'
        ]);
    }

    public function unauthorizedAction()
    {
        throw new ApiUnauthorizedException('you can not call this api');
    }

    public function show404Action()
    {
        echo '404';
    }
}