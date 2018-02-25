<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/26下午9:39
 * @package TopCms\Apps\User\Handler
 */

namespace TopCms\Apps\User\Handler;

use Phalcon\Di;
use TopCms\Apps\User\Acl;
use TopCms\Apps\User\Login;
use TopCms\Framework\Exceptions\ApiParamErrorException;
use TopCms\Framework\Mvc\Handler\BaseHandler;
/**
 * Class LoginHandler
 * @package TopCms\Apps\User\Handler
 */
class LoginHandler extends BaseHandler
{
    public function getCurUserAction($params= array())
    {
        $di = Di::getDefault();
        $login = new Login();
        $user = $login->getCurUser();

        $acl = new Acl();
        $role_id = 4;
        if (!empty($user)) {
            $role_id = $user->role_id;
        }
        $menu = $acl->getMenuByRoleId($role_id);
        $this->successJson([
            'userInfo' => $user,
            'menu' => $menu
        ]);
    }

    public function loginAction($params)
    {
        $identifier = $params['identifier'] ?? '';
        $credential = $params['credential'] ?? '';
        if (empty($identifier) || empty($credential)) {
            throw new ApiParamErrorException('param error');
        }
        $login = new Login();
        $status = $login->login($identifier, $credential);
        if ($status) {
            $this->successJson(['msg' => '登录成功!']);
        } else {
            $this->failJson(['msg' => '用户名或密码错误！！']);
        }
    }

    public function logoutAction($params)
    {
        $login = new Login();
        $login->logout();
        $this->successJson(['msg' => 'logout success!']);
    }
}