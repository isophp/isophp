<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 29/12/17
 * Time: 12:00
 * Email: ln6265431@163.com
 */

namespace TopCms\Framework\Log;
use Phalcon\Logger\Adapter\File as FileAdapter;


class FileLogger extends FileAdapter
{
    public function log($type, $message = null, array $context = null) {

        parent::log($type, $message, $context);
    }

    protected function pretreatMessage(&$message)
    {
        if (is_array($message)) {
            $message = var_export($message, true);
        }
    }

    public function error($message, array $context = null)
    {
        $this->pretreatMessage($message);
        parent::error($message, $context);
    }

    public function critical($message, array $context = null)
    {
        $this->pretreatMessage($message);
        parent::critical    ($message, $context);
    }

    public function emergency($message, array $context = null)
    {
        $this->pretreatMessage($message);
        parent::emergency($message, $context);
    }

    public function debug($message, array $context = null)
    {
        $this->pretreatMessage($message);
        parent::debug($message, $context);
    }

    public function info($message, array $context = null)
    {
        $this->pretreatMessage($message);
        parent::info($message, $context);
    }

    public function notice($message, array $context = null)
    {
        $this->pretreatMessage($message);
        parent::notice($message, $context);
    }

    public function warning($message, array $context = null)
    {
        $this->pretreatMessage($message);
        parent::warning($message, $context);
    }

    public function alert($message, array $context = null)
    {
        $this->pretreatMessage($message);
        parent::alert($message, $context);
    }


}