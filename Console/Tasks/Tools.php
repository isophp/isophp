<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/2/24下午12:49
 */

/**
 * Class Tools
 */
class Tools extends \Phalcon\Cli\Task
{
    public function createUser($params)
    {
        if (count($params) != 2) {
            echo '请输入连个参数 角色id 用户名 密码';
        }
        $roleId = $params[0];
        $username = $params[1];
        $password = $params[2];
        $user = new \TopCms\Apps\User\Models\User();
        $user->role_id = $roleId;
        $user->save();

        $auth = new \TopCms\Apps\User\Models\Auth();
        $auth->login_type = 'username';
        $bcryptHasher = new \TopCms\Framework\Core\Security\BcryptHasher();
        $auth->credential = $bcryptHasher->make($password);
        $auth->identifier = $username;
        $auth->save();
    }
}