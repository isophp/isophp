<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 09/01/18
 * Time: 11:12
 * Email: ln6265431@163.com
 */

namespace TopCms\Apps\User\Handler;

use TopCms\Apps\User\RoleInfo;
use TopCms\Framework\Mvc\Handler\BaseHandler;

class RoleHandler extends BaseHandler
{
    public function listAction()
    {
        $roleInfo = new RoleInfo();
        $list = $roleInfo->getRoleList();
        $this->successJson($list);
    }
}