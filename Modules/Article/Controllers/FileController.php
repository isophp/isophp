<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/2/11下午5:09
 * @package TopCms\Modules\Article\Controllers
 */

namespace TopCms\Modules\Article\Controllers;

use TopCms\Framework\Core\FileRef\FileManager;
use TopCms\Framework\Log\Log;
use TopCms\Framework\Mvc\Controller\BaseController;

/**
 * Class FileController
 * @package TopCms\Modules\Article\Controllers
 */
class FileController extends BaseController
{
    public function uploadAction()
    {
        $config = [
            'fileSource' => 'article'
        ];
        $fileManager = new FileManager($config);
        $urls = $fileManager->upload();
        $response = $this->response;
        $response->setContentType('application/json');

        if ($urls) {
            $url = reset($urls);
            $url = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $url;
            $data = [
                'success' => 1,
                'message' => '上传成功',
                'url' => $url
            ];
        } else {
            $data = [
                'success' => 0,
                'message' => '上传失败'
            ];
        }
        $response->setContent(json_encode($data));
        $response->send();
    }
}