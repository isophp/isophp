<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 03/01/18
 * Time: 18:21
 * Email: ln6265431@163.com
 */
namespace TopCms\Modules\Sys\Controllers;

use TopCms\Apps\User\Acl;
use TopCms\Apps\User\Login;
use TopCms\Framework\Exceptions\ApiParamErrorException;
use TopCms\Framework\Exceptions\ApiUnauthorizedException;
use TopCms\Framework\Mvc\Controller\BaseController;
use TopCms\Framework\Mvc\Handler\HandlerFactory;
use Phalcon\Mvc\Controller;

class ApiHandlerController extends BaseController
{
    /**
     * @return mixed
     * @throws ApiParamErrorException
     * @throws ApiUnauthorizedException
     */
    public function indexAction()
    {

        $params = $this->request->getJsonRawBody(true);
        $module = $params['module'] ?? '';
        $handler = $params['handler'] ?? '';
        $method = $params['method'] ?? '';
        $payload = $params['payload'] ?? array();

        $login = new Login();
        $user = $login->getCurUser();

        $acl = new Acl();
        if (!$acl->checkCurUserApiPermission($user, $module, $handler, $method)) {
            throw new ApiUnauthorizedException('need Login');
        }

        if (empty($module) || empty($method) || empty($handler)) {
            throw new ApiParamErrorException('字段错误');
        }
        // todo 接口鉴权


        $handlerFactory = new HandlerFactory();
        return $handlerFactory->call($module, $handler, $method, $payload);
    }

    protected function isLogin()
    {

    }
}