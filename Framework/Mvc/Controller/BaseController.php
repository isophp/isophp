<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/7下午6:58
 */

namespace TopCms\Framework\Mvc\Controller;

use Phalcon\Di;
use Phalcon\Mvc\Controller;

/**
 * Class BaseController
 */
class BaseController extends Controller
{
    public function show404()
    {
        $this->dispatcher->forward([
            'module' => 'Sys',
            'controller' => 'index',
            'action' => 'show404',
        ]);
    }
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