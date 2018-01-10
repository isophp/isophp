<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/7下午7:01
 */
namespace TopCms\Framework\Handler;
use Phalcon\Di;

/**
 * Class BaseHandler
 */
class BaseHandler
{
    public function successJson($data)
    {
        $this->responseJson($data, 0);
    }

    public function failJson($data)
    {
        $this->responseJson($data, -1);
    }

    public function responseJson($data, $status = 0)
    {
        $ret = [
            'status' => $status,
            'data' => $data
        ];
        $response = Di::getDefault()->get('response');
        $response->setContentType('application/json');
        $response->setContent(json_encode($ret));
        $response->send();
    }
}