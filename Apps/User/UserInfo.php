<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/7下午5:41
 * @package Apps\Auth
 */

namespace TopCms\Apps\User;

use Phalcon\Di;
use TopCms\Apps\User\Models\Auth;
use TopCms\Apps\User\Models\Role;
use TopCms\Apps\User\Models\User;
use TopCms\Framework\Core\Security\BcryptHasher;

/**
 * Class UserInfo
 * @package Apps\Auth
 */
class UserInfo
{
    public function getUserList($page, $pageSize)
    {
        $di = Di::getDefault();
        $manager = $di->getShared('modelsManager');
        $phql = 'select user.id,user.nickname,user.status as user_status,user.avatar,' .
        'auth.identifier,auth.login_type,role.name as role_name,auth.status as auth_status from TopCms\Apps\User\Models\User as user join ' .
            'TopCms\Apps\User\Models\Role as role join TopCms\Apps\User\Models\Auth as auth';
        $list = $manager->createQuery($phql)
            ->execute()->toArray();
        return $list;
    }

    public function userTotal()
    {
        return count(User::find());
    }

    public function getRoleById($id)
    {
        return Role::findFirst([
            'conditions' => 'id=:id:',
            'bind' => [
                'id' => $id
            ]
        ]);
    }

    public function addUser($identifier, $credential, $login_type, $roleId, $nickname = '', $avatar = '')
    {
        $role = $this->getRoleById($roleId);
        if (empty($role)) {
            return [false, '角色不存在'];
        }
        $db = Di::getDefault()->getShared('db');
        $db->begin();
        $user = new User();
        $user->nickname = $nickname;
        $user->role_id = $roleId;
        $user->avatar = $avatar;
        if (!$user->save()) {
            $db->rollback();
            return [false, $user->getStringMessages()];
        }

        $bcryptHasher = new BcryptHasher();
        $auth = new Auth();
        $auth->identifier = $identifier;
        $auth->credential = $bcryptHasher->make($credential);
        $auth->user_id = $user->id;
        $auth->login_type = $login_type;
        if (!$auth->save()) {
            $db->rollback();
            return [false, $auth->getStringMessages()];
        }
        $db->commit();
        return [true, [
            'id' => $user->id,
            'role_id' => $auth->id
        ]];
    }
}