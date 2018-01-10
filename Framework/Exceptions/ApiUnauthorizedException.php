<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/6下午10:24
 * @package Framework\Exceptions
 */

namespace TopCms\Framework\Exceptions;

/**
 * Class ApiUnauthorizedException
 * @package Framework\Exceptions
 */
class ApiUnauthorizedException extends ApiException
{
    protected $httpCode = 401;
}