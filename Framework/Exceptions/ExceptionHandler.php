<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 05/01/18
 * Time: 15:14
 * Email: ln6265431@163.com
 */
namespace TopCms\Framework\Exceptions;

use TopCms\Framework\Log\Log;
use Phalcon\Di;
use Phalcon\DiInterface;
use Whoops\Handler\JsonResponseHandler;
use Whoops\Handler\PrettyPageHandler;
use Whoops\Run;

class ExceptionHandler
{
    /**
     * 捕获自定义异常 记录非自定义异常
     * @param \Exception $e
     * @throws
     */
    public function handleException($e)
    {
        $di = Di::getDefault();
        Log::getLogger('system')->error([
            'message' => $e->getMessage(),
            'trace'   => $e->getTraceAsString(),
        ]);
        if (defined('ENVIRONMENT') && ENVIRONMENT === 'DEVELOPMENT') {
            $this->handleDevelopmentException($di, $e);
        } else {
            $this->handleProductionException($di, $e);
        }
    }

    public function handleError($level, $message, $file = '', $line = 0, $context = [])
    {
        if (error_reporting() & $level) {
            Log::getLogger('system')->error([
                'level' => $level,
                'file' => $file,
                'line' => $line,
                'message' => $message,
            ]);
            throw new \ErrorException($message, 0, $level, $file, $line);
        }
    }

    public function handleShutDown()
    {
        if (!is_null($error = error_get_last()) && $this->isFatal($error['type'])) {
            Log::getLogger('system')->error($error);
            $msg = [];
            foreach ($error as $key => $val) {
                $msg[] = $key . ':' . $val;
            }
            $msg = implode("\n", $msg);
            $e = new SysException($msg);
            $this->handleException($e);
        }
    }

    protected function isFatal($type)
    {
        return in_array($type, [E_COMPILE_ERROR, E_CORE_ERROR, E_ERROR, E_PARSE]);
    }

    /**
     * @param DiInterface $di
     * @param \Exception $e
     * @return mixed
     */
    protected function handleDevelopmentException($di, $e)
    {
        $whoops = new Run();
        $response = $di->getResponse();
        if ($e instanceof ApiException){
            $response->setStatusCode($e->getHttpCode());
            $response->setJsonContent(json_encode([
                'status' => $e->getHttpCode(),
                'msg' => $e->getMessage(),
            ]));
            $response->send();
        }else{
            //否则返回html数据
            $whoops->pushHandler(new PrettyPageHandler());
            return  $whoops->handleException($e);
        }
    }

    protected function handleProductionException($di, $e)
    {
        $response = $di->getResponse();
        if ($e instanceof ApiException) {
            $response->setStatusCode($e->getHttpCode());
            $response->setJsonContent(json_encode([
                'status' => $e->getHttpCode(),
                'msg' => $e->getMessage(),
            ]));
        } else {
            $response->setStatusCode(500, 'System Error');
        }
        $response->send();
    }
}