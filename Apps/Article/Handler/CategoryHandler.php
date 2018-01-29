<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/13下午11:24
 * @package TopCms\Apps\Article\Handler
 */

namespace TopCms\Apps\Article\Handler;

use TopCms\Apps\Article\CategoryInfo;
use TopCms\Framework\Exceptions\ApiParamErrorException;
use TopCms\Framework\Mvc\Handler\BaseHandler;

/**
 * Class CategoryHandler
 * @package TopCms\Apps\Article\Handler
 */
class CategoryHandler extends BaseHandler
{

    public function listAction($params)
    {
        $currentPage = $params['currentPage'] ?? 1;
        $pageSize = $params['pageSize'] ?? 10;
        $categoryInfo = new CategoryInfo();
        $list = $categoryInfo->getCategoryList($currentPage, $pageSize);
        $this->successJson(['list' => $list]);
    }

    public function treeAction()
    {
        $categoryInfo = new CategoryInfo();
        $tree = $categoryInfo->getCategoryTree();
        $this->successJson(['tree' => $tree]);
    }

    public function addAction($params)
    {
        $name = $params['name'] ?? '';
        $parentId = $params['parentId'] ?? 0;
        $categoryInfo = new CategoryInfo();
        list($status, $message) = $categoryInfo->addCategory($name, $parentId);
        if ($status) {
            $this->successJson(['id' => $message]);
        } else {
            throw new ApiParamErrorException($message);
        }
    }

    public function editAction($params)
    {
        $name = $params['name'] ?? '';
        $id = $params['id'] ?? 0;
        if (empty($id) || empty($name)) {
            throw new ApiParamErrorException('参数错误');
        }
        $categoryInfo = new CategoryInfo();
        list($status, $message) = $categoryInfo->editorCategory($id, $name);
        if ($status) {
            $this->successJson(['id' => $message]);
        } else {
            $this->failJson(['message' => $message]);
        }
    }

    public function tree1Action()
    {
        $ret = [
            [
                'id' => 1,
                'name' => '语言',
                'children' => [
                    [
                        'name' => 'PHP',
                        'id' => 2
                    ],
                    [
                        'name' => 'CPP',
                        'id' => 3
                    ]
                ],
            ],[
                'id' => 4,
                'name' => '设计模式',
                'children' => [
                    [
                        'id' => 5,
                        'name' => '单例模式'
                    ],[
                        'id' => 6,
                        'name' => '观察者模式'
                    ]
                ]
            ]
        ];
        $this->successJson(['list' => $ret]);
    }
}