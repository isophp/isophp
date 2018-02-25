<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/7下午5:41
 * @package Apps\Auth
 */

namespace TopCms\Apps\User;

use Phalcon\Di;
use TopCms\Apps\User\Models\User;

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
        $phql = 'select user.id,user.nickname,user.status as user_status,' .
        '';
        $list = $manager->createBuilder()
            ->from('TopCms\Apps\User\Models\User')
            ->join('TopCms\Apps\User\Models\Role')
            ->limit($pageSize, ($page - 1) * $pageSize)
            ->getQuery()
            ->execute()->toArray();
        return $list;
    }

    public function userTotal()
    {
        return count(User::find());
    }
}