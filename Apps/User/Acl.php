<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 08/01/18
 * Time: 14:52
 * Email: ln6265431@163.com
 */

namespace TopCms\Apps\User;


class Acl
{
    public function getCurUser()
    {
        return  [
                'id' => 1,
                'name' => 'Zeus',
                'address' => '北京',
                'avatar' => 'http://upload.dianyingjie.com/2017/0404/1491275068881.jpeg',
                'notifyCount' => 10,
        ];
    }

    public function checkCurUserApiPermission($module, $method)
    {
        $user = $this->getCurUser();
        return $this->checkUserApiPermission($user['id'], $module, $method);
    }

    public function checkUserApiPermission($userId, $module, $method)
    {
        return true;
    }
}