<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/13下午9:15
 */
namespace TopCms\Apps\Article\Handler;
use TopCms\Apps\Article\ArticleInfo;
use TopCms\Apps\Article\CategoryInfo;
use TopCms\Framework\Exceptions\ApiParamErrorException;
use TopCms\Framework\Log\Log;
use TopCms\Framework\Mvc\Handler\BaseHandler;

/**
 * Class ArticleHandler
 */
class ArticleHandler extends BaseHandler
{
    public function addAction($params)
    {
        sleep(5);
        $title = $params['title'] ?? '';
        $content = $params['content'] ?? '';
        $categoryId = $params['categoryId'] ?? '';
        // todo 获得当前用户
        $author = 'admin';
        $status = $params['status'] ?? '';
        $extra = $params['extra'] ?? array();
        $articleInfo = new ArticleInfo();
        list($status, $message) = $articleInfo->add($title, $content, $categoryId, $author, $status, $extra);
        if ($status) {
            $this->successJson(['message' => 'success', 'id' => $message]);
        } else {
            $this->failJson(['msg' => $message]);
        }
    }

    public function updateStatusByIdsAction($params)
    {
        $ids = $params['ids'] ?? 0;
        $ids = explode(',', $ids);
        $status = $params['status'] ?? null;
        $ids = array_filter($ids, function($id) {
            return is_numeric($id);
        });
        if (empty($ids) || !in_array($status, array(0, 1, 2, 3))) {
            throw new ApiParamErrorException('参数丢失或错误');
        }
        $articleInfo = new ArticleInfo();
        list($status, $message) = $articleInfo->updateStatusByIds($ids, $status);

        if ($status) {
            $this->successJson(['msg' => 'success']);
        } else {
            $this->failJson(['msg' => $message]);
        }
    }

    public function deleteAction($params)
    {
        $id = $params['id'] ?? 0;
        $id = intval($id);
        if (empty($id) || !is_int($id)) {
            throw new ApiParamErrorException('参数丢失或错误');
        }
        $articleInfo = new ArticleInfo();
        list($status, $message) = $articleInfo->deleteArticle($id);
        if ($status) {
            $this->successJson(['msg' => 'success', 'id' => $id]);
        } else {
            $this->failJson(['msg' => $message]);
        }
    }

    public function updateAction($params)
    {
        sleep(5);
        $id = $params['id']?? '';
        $title = $params['title'] ?? '';
        $content = $params['content'] ?? '';
        $categoryId = $params['categoryId'] ?? '';
        // todo 获得当前用户
        $author = 'admin';
        $status = $params['status'] ?? '';
        $extra = $params['extra'] ?? array();
        $articleInfo = new ArticleInfo();
        if (empty($id)) {
            throw new ApiParamErrorException('lost param id');
        }
        list($status, $message) = $articleInfo->save($id, $title, $content, $categoryId, $author, $status, $extra);
        if ($status) {
            $this->successJson(['message' => 'success', 'id' => $message]);
        } else {
            $this->failJson(['msg' => $message]);
        }
    }

    public function listAction($params)
    {
        $keyword = $params['keyword'] ?? '';
        $currentPage = $params['currentPage'] ?? 1;
        $pageSize = $params['pageSize'] ?? 10;
        $categoryId = $params['categoryId'] ?? '';
        $article = new ArticleInfo();
        $list = $article->getArticleList($currentPage, $pageSize, $categoryId, $keyword);
        $total = $article->articleNumber($categoryId, $keyword);
        $data = [
            'list' => $list,
            'pagination' => [
                'current' => intval($currentPage),
                'pageSize' => intval($pageSize),
                'total' => $total,
            ]
        ];
        $this->successJson($data);
    }
    public function detailAction($params) {
        $id = $params['id'] ?? '';
        if (empty($id) || !is_numeric($id)) {
            throw new ApiParamErrorException('param id error');
        }
        $articleInfo = new ArticleInfo();
        $categoryInfo = new CategoryInfo();
        $info = $articleInfo->getArticle($id);
        $parents = $categoryInfo->getParentIdList($info['category_id']);
        array_push($parents, $info['category_id']);
        $info['cascader'] = $parents;
        $this->successJson($info);
    }
}