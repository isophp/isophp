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
use TopCms\Framework\Exceptions\ApiParamErrorException;
use TopCms\Framework\Exceptions\ApiUnauthorizedException;
use TopCms\Framework\Handler\HandlerFactory;
use Phalcon\Mvc\Controller;

class ApiHandlerController extends Controller
{
    /**
     * web api
     * @throws ApiParamErrorException
     */
    public function indexAction()
    {
        $module = $this->request->getPost('module');
        $handler = $this->request->getPost('handler');
        $method = $this->request->getPost('method');
        $payload = $this->request->getPost('payload');
        if (empty($payload)) {
            $payload = array();
        }
        if (empty($module) || empty($method) || empty($handler)) {
            throw new ApiParamErrorException('字段错误');
        }

        $acl = new Acl();
        if (!$user = $acl->getCurUser()) {
            throw new ApiParamErrorException('please login');
        }
        if (!$acl->checkCurUserApiPermission($module, $method)) {
            throw new ApiUnauthorizedException('no access to this api');
        }

        $handlerFactory = new HandlerFactory();
        return $handlerFactory->call($module, $handler, $method, $payload);
    }
}