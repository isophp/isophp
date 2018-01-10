<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 05/01/18
 * Time: 17:17
 * Email: ln6265431@163.com
 */

namespace TopCms\Framework\Exceptions;


use Throwable;

class SysException extends \Exception
{
    public function __construct(string $message = "", int $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}