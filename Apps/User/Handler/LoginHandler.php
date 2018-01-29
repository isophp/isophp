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
        // 这里进行参数检查
        if (false) {
            // 参数错误，抛出异常即可
            throw new ApiParamErrorException('参数错误');
        }
        // 具体数据操作使用Apps/User目录下的类，例如这里是Acl,Acl相当于Repository,去操作Models下的model。
        // 同时Acl这些也会被前端页面controller调用
        $acl = new Acl();
        $data = $acl->getCurUser();
        // 这里进行数据结构封装，例如BaseHandler例如successJson()
        // 返回status通常都是0，表示成功，因为不合法的会以抛出异常的方法返回。保留status可用于不同业务需求
        sleep(2);
        $this->successJson([
            'userInfo' => $data,
            'menu' => $di->getShared('config')->menu->toArray()
        ]);
    }
}