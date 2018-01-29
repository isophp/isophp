<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 05/01/18
 * Time: 16:38
 * Email: ln6265431@163.com
 */
namespace TopCms\Modules\User\Controllers;

use TopCms\Framework\Mvc\Controller\BaseController;
use TopCms\Framework\Exceptions\ApiParamErrorException;

class IndexController extends BaseController
{
    public function indexAction()
    {
        echo 'ss';
    }

    public function loginAction()
    {
        $this->responseJson([
            'ss' => 'asdf',
            'asdfasd' => '111',
        ]);
    }

    public function registerAction()
    {
        $username = $this->request->getPost('username');
        if (empty($username)) {
            throw new ApiParamErrorException('username can not be empty');
        }
    }
}