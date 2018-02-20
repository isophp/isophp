<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/26下午11:53
 * @package TopCms\Apps\Article
 */

namespace TopCms\Apps\Article;

use TopCms\Apps\Article\Models\Category;
use TopCms\Framework\Exceptions\ApiParamErrorException;

/**
 * Class CategoryInfo
 * @package TopCms\Apps\Article
 */
class CategoryInfo
{
    const CATEGORY_STATUS_ONLINE = 0;
    const CATEGORY_STATUS_DELETE = 1;

    public function getParentIdList(int $id) {
        $parents = [];
        $category = Category::findFirst([
            "id='$id'"
        ]);
        while ($category->parent_id) {
            $category = Category::findFirst([
                "id='$category->parent_id'"
            ]);
            array_unshift($parents, $category->id);
        }
        return $parents;
    }
    public function getCategoryTree($status = 0) {
        $query = Category::query()
        ->columns([
            'id',
            'name',
            'parent_id'
        ])
        ->andWhere('del=?0',[$status]);
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
        if (Category::findFirst([
            "name='$name'"
        ])) {
            return [false, '栏目已经存在'];
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

    public function updateCategory(int $id, string $name, int $parentId = 0)
    {
        $category = Category::findFirst([
            "id='$id'"
        ]);
        if (!$category) {
            return [false, '栏目不存在'];
        }
        if ($category->name === $name) {
            return [false, '栏目名未改变'];
        }
        if ($this->categoryExist($name)) {
            return [false, '栏目名已存在'];
        }
        $category->name = $name;
        if (!$category->save()) {
            return [false, $category->getMessages()];
        }
        return [true, $category->id];
    }

    public function categoryNumber()
    {
        return Category::count();
    }

    public function categoryExist($name)
    {
        $category = Category::find([
            'name=?0',
            'bind' => [
                $name
            ]
        ])->toArray();
        return count($category);
    }

    public function deleteCategory($id)
    {
        $category = Category::findFirst([
            'id=?0',
            'bind' => [
                $id
            ]
        ]);
        if (empty($category)) {
            return [false, '栏目不存在'];
        }
        $childrenCategories = Category::find([
            'parent_id=?0 and del=0',
            'bind' => [
                $id
            ]
        ]);
        if (count($childrenCategories->toArray())) {
            return [false, '该栏目无法删除，存在未删除的子栏目'];
        }
        $articleInfo = new ArticleInfo();
        $articleNumber = $articleInfo->articleNumber($id, '', $articleInfo::ARTICLE_STATUS_PUBLISH);
        if ($articleNumber) {
            return [false, '栏目下又发布状态的文章!'];
        }
        $category->del = self::CATEGORY_STATUS_DELETE;
        $category->save();
        return [true, 'success'];
    }

    public function cancelDeleteCategory($id)
    {
        $category = Category::findFirst([
            'id=?0',
            'bind' => [
                $id
            ]
        ]);
        if (empty($category)) {
            return [false, '栏目不存在'];
        }
        $category->del = self::CATEGORY_STATUS_ONLINE;
        $category->save();
        return [true, 'success'];
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