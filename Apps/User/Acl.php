<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 08/01/18
 * Time: 14:52
 * Email: ln6265431@163.com
 */

namespace TopCms\Apps\User;


use Phalcon\Di;

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

    public function checkCurUserApiPermission($user, $module, $handler, $method)
    {
//        $aclList = Acl::findFirst([
//            'conditions' => 'module=:module: and handler=:handler: and method=:method:',
//            'bind' => [
//            ]
//        ]);
//        if (!empty($aclList)) {
//            return true;
//        } else {
//            return false;
//        }
        if (empty($user) && ($method == 'getCurUser' || $method == 'login')) {
            return true;
        }
        if (!empty($user)) {
            return true;
        }
        return false;
    }

    public function getMenuByRoleId($roleId)
    {
        $di = Di::getDefault();
        if ($roleId == 4) {
            return $di->getShared('config')->guestMenu->toArray();
        } else {
            return $di->getShared('config')->menu->toArray();
        }
    }

    public function checkUserApiPermission($userId, $module, $method)
    {
        return true;
    }
}