<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 03/01/18
 * Time: 18:21
 * Email: ln6265431@163.com
 */
namespace TopCms\Modules\Article\Controllers;

use TopCms\Apps\Article\ArticleInfo;
use TopCms\Framework\Mvc\Controller\BaseController;

class IndexController extends BaseController
{
    public function detailAction()
    {
        $articleId = $this->dispatcher->getParam("id");
        $articleInfo = new ArticleInfo();
        $info = $articleInfo->getArticle($articleId)->toArray();
        $parseDown = new \Parsedown();
        if ($cache = $this->getViewFromCache()) {
            $info['content'] = $cache;
        } else {
            $info['content'] = $parseDown->text($info['content']);
        }
        $this->view->setVar('article', $info);
        $this->view->pick('pages/article/detail');
    }

    protected function getViewFromCache()
    {
        $key = $_SERVER['REQUEST_URI'];
        return false;
    }
}