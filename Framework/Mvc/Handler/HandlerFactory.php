<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/7下午7:03
 */
namespace TopCms\Framework\Mvc\Handler;
use TopCms\Framework\Exceptions\ApiNotFoundException;

/**
 * Class HandlerFactory
 */
class HandlerFactory
{
    public function call($module, $handler, $method, $payload)
    {
        $handler = $this->getHandler($module, $handler);
        $action = $method . 'Action';
        if (method_exists($handler, $action))
        {
            $ret = call_user_func([$handler, $action], $payload);
            return $ret;
        }
        throw new ApiNotFoundException('method not exist');
    }

    public function getHandler($module, $handlerName = 'Ajax')
    {
        $handlerName = '\\TopCms\\Apps\\' . $module . '\\Handler\\' . $handlerName . 'Handler';
        if (class_exists($handlerName)) {
            $handler = new $handlerName();
            return $handler;
        }
        throw new ApiNotFoundException('handler not exist');
    }
}