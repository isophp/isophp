<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 29/12/17
 * Time: 10:38
 * Email: ln6265431@163.com
 */

namespace Tests\InterfaceTest;

use TopCms\Framework\Exceptions\ApiUnauthorizedException;
use Tests\UnitTestCase;

class CommonTest extends UnitTestCase
{

    // 路由测试
    public function testTestApi()
    {
        $ret = $this->get('/test');
        $ret = json_decode($ret->getContent(), true);
        $this->assertEquals(0, $ret['status']);
        $this->assertEquals('test controller', $ret['data']['msg']);
    }

    public function testUnauthorizedApi()
    {
        try {
            $this->get('/unauthorized');
        } catch (ApiUnauthorizedException $e) {
            $this->assertEquals('you can not call this api', $e->getMessage());
        }
    }
}