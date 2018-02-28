<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/2/26下午12:37
 * @package TopCms\Apps\User
 */

namespace TopCms\Apps\User;

use TopCms\Apps\User\Models\Role;

/**
 * Class RoleInfo
 * @package TopCms\Apps\User
 */
class RoleInfo
{
    public function getRoleList()
    {
        return Role::find()->toArray();
    }
}