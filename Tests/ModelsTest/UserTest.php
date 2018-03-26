<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 29/12/17
 * Time: 10:38
 * Email: ln6265431@163.com
 */
namespace Tests\ModelsTest;

use TopCms\Apps\User\Models\Users;
use Phalcon\Di;
use Tests\UnitTestCase;

class UserTest extends UnitTestCase
{

    public function testFpDeviceModel()
    {
        $user = new Users();
        $tableName = $user->getTableName();
        $this->assertEquals('User', $tableName);
        $this->assertEquals('user11', $tableName);
    }
}