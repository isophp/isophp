<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/6下午10:22
 * @package Framework\Exceptions
 */

namespace TopCms\Framework\Exceptions;

/**
 * Class ApiNotFoundException
 * @package Framework\Exceptions
 */
class ApiNotFoundException extends ApiException
{
    protected $httpCode = 404;
}