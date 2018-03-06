<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/3/3上午1:15
 */
namespace TopCms\Modules\Activity\Controllers;

use TopCms\Apps\User\Login;
use TopCms\Framework\Core\FileRef\FileManager;
use TopCms\Framework\Log\Log;
use TopCms\Framework\Mvc\Controller\BaseController;

/**
 * Class FileController
 */
class FileController extends BaseController
{
    public function uploadAction()
    {
        $login = new Login();
        $curUser = $login->getCurUser();
        // todo 权限管理同一化
        if (empty($curUser) || $curUser->role_id > 2) {
            $data = [
                'success' => 0,
                'message' => '上传失败'
            ];
            return $this->failJson($data);
        }
        $config = [
            'fileSource' => 'activity'
        ];
        $fileManager = new FileManager($config);
        $urls = $fileManager->upload();

        if ($urls) {
            $url = reset($urls);
            $url = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $url;
            $data = [
                'success' => 1,
                'message' => '上传成功',
                'url' => $url
            ];
            return $this->successJson($data);
        } else {
            $data = [
                'success' => 0,
                'message' => '上传失败'
            ];
            return $this->failJson($data);
        }
    }
}