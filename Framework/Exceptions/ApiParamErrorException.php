<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/6下午10:23
 * @package Framework\Exceptions
 */

namespace TopCms\Framework\Exceptions;

/**
 * Class ApiParamErrorException
 * @package Framework\Exceptions
 */
class ApiParamErrorException extends ApiException
{
    protected $httpCode = 400;
}