<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/6下午9:15
 * @package Framework\Exceptions
 */

namespace TopCms\Framework\Exceptions;

use Exception;

/**
 * Class ApiException
 * @package Framework\Exceptions
 */
abstract class ApiException extends \Exception
{
    protected $httpCode = '400';

    public function __construct($message, $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    public function getHttpCode()
    {
        return $this->httpCode;
    }
}