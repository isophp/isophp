<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 28/12/17
 * Time: 13:30
 * Email: ln6265431@163.com
 */
namespace TopCms\Framework\Log;
use Phalcon\Di;

class Log
{
    protected static $loggers = [];
    protected static $filenameFormat = '{loggername}-{date}.log';

    public static function getLogger(string $loggerName = ''):FileLogger
    {
        if (empty($loggerName)) {
            $loggerName = Di::getDefault()->getConfig()->application->appName;
        }
        if (!preg_match('/^[\w-]{2,20}$/', $loggerName)) {
            throw new \Exception('日志名不合法，必须满足正则表达式/^[\w-]{2,20}$/');
        }
        $loggerFileName = str_replace(array('{loggername}', '{date}')
            ,array($loggerName, date('Y-m-d')), self::$filenameFormat);

        $logPath = Di::getDefault()->getConfig()->application->logDir . $loggerFileName;
        if (!file_exists($logPath)) {
            self::rotate($logPath);
        }
        if (!isset(self::$loggers[$logPath])) {
            self::$loggers[$logPath] = new FileLogger($logPath);
        }
        return self::$loggers[$logPath];
    }

    /**
     * check and delete expire log file
     * @param $logPath
     */
    protected static function rotate($logPath)
    {
        $logFiles = glob(self::getGlobPattern($logPath));
        $maxLogs = Di::getDefault()->getConfig()->application->maxLogs;
        if ($maxLogs >= count($logFiles)) {
            return;
        }
        usort($logFiles, function ($a, $b) {
            return strcmp($b, $a);
        });
        foreach (array_slice($logFiles, $maxLogs) as $file) {
            if (is_writable($file)) {
                set_error_handler(function ($errno, $errstr, $errfile, $errline) {});
                unlink($file);
                restore_error_handler();
            }
        }
    }

    protected static function getGlobPattern($loggerName)
    {
        $fileInfo = pathinfo($loggerName);
        $glob = str_replace(
            array('{loggername}', '{date}'),
            array($loggerName, '*'),
            $fileInfo['dirname'] . '/' . self::$filenameFormat
        );

        return $glob;
    }
}