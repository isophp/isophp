<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/26下午11:53
 * @package TopCms\Apps\Article
 */

namespace TopCms\Apps\Article;

use TopCms\Apps\Article\Models\Category;

/**
 * Class CategoryInfo
 * @package TopCms\Apps\Article
 */
class CategoryInfo
{

    public function getCategoryTree() {
        $query = Category::query()
        ->columns([
            'id',
            'name',
            'parent_id'
        ]);
        $tree = [];
        $list = $query->execute()->toArray();
        return $this->generateTree($list);
    }
    public function getAllCategory()
    {
        $query = Category::find();

        return $query->execute()->toArray();
    }

    public function getCategoryList(int $page = 1, int $pageSize = 10)
    {
        $query = Category::query();

        $query->limit($pageSize, ($page - 1) * $pageSize);
        return $query->execute()->toArray();
    }

    public function addCategory(string $name, int $parentId = 0)
    {
        if (!empty($parentId)) {
            $category = Category::findFirst([
                "id='$parentId'"
            ]);
            if (!$category) {
                return [false, '父节点不存在'];
            }
        }
        $category = new Category([
            'name' => $name,
            'parent_id' => $parentId
        ]);
        if (!$category->save()) {
            return [false, implode(',', $category->getStringMessages())];
        }
        return [true, $category->id];
    }

    public function editorCategory(int $id, string $name, int $parentId = 0)
    {
        $category = Category::findFirst([
            "id='$id'"
        ]);
        if (!$category) {
            return [false, '栏目不存在'];
        }
        $category->name = $name;
        if (!$category->save()) {
            return [false, $category->getMessages()];
        }
        return [true, $category->id];
    }

    protected function generateTree($list)
    {
        $root = $this->findNodeByParentId($list, 0);
        return $this->buildTree($list, $root);
    }

    protected function findNodeByParentId($list, $parentId)
    {
        $list = array_filter($list, function($node) use ($parentId){
            return $node['parent_id'] == $parentId;
        });
        return array_values($list);
    }

    protected function buildTree($list, $root)
    {
        $children = null;
        foreach ($root as &$node) {
            $children = $this->findNodeByParentId($list, $node['id']);
            $children = $this->buildTree($list, $children);
            $node['children'] = $children;
        }
        return $root;
    }


}