<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/7下午7:01
 */
namespace TopCms\Framework\Mvc\Handler;
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
        $response
                ->setHeader('Access-Control-Allow-Origin', 'http://devel.isophp.cn:8000')
                ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
                ->setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Range, Content-Disposition, Content-Type, Authorization')
                ->setHeader('Access-Control-Allow-Credentials', 'true');
        $response->setContentType('application/json');
        $response->setContent(json_encode($ret));
        $response->send();
    }
}
