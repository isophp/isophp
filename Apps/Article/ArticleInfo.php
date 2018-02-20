<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/13下午9:15
 */
namespace TopCms\Apps\Article;

use Hashids\Hashids;
use Phalcon\Di;
use TopCms\Apps\Article\Models\Content;
use TopCms\Framework\Log\Log;

// todo 文章发布时，查看栏目状态是否删除！！！

/**
 * Class ArticleInfo
 */
class ArticleInfo
{
    const ARTICLE_STATUS_DRAFT = 0; // 草稿
    const ARTICLE_STATUS_CHECK = 1; // 审核中
    const ARTICLE_STATUS_PUBLISH = 2; // 发布
    const ARTICLE_STATUS_DELETE = 3; // 删除

    public function getArticleConfig()
    {
        $di = Di\FactoryDefault\Cli::getDefault();
        return $di->getShared('config')->article->toArray();
    }


    public function encodeArticleId(int $id)
    {
        $config = $this->getArticleConfig();
        if (!is_numeric($id)) {
            throw new \Exception('文章id必须为整数');
        }
        $hashIds = new Hashids($config['idSalt'], $config['minLength']);
        return $hashIds->encode($id);
    }

    public function decodeArticleId(string $id)
    {
        $config = $this->getArticleConfig();
        if (is_numeric($id) && strlen($id) < $config['minLength']) {
            return $id;
        }
        $hashIds = new Hashids($config['idSalt'], $config['minLength']);
        return $hashIds->decode($id)[0];
    }


    public function add(string $title, string $content, int $categoryId,
                        string $author, int $status, array $extra = array(), string $intro = '')
    {
        $info = [
            'title' => $title,
            'content' => $content,
            'category_id' => $categoryId,
            'author' => $author,
            'status' => $status,
            'extra' => json_encode($extra, true),
            'intro' => $intro,
        ];
        Log::getLogger()->info($info);
        $article = new Content($info);
        if (!$article->save($article)) {
            Log::getLogger()->info($article->getMessages());
            return [false, $article->getMessages()];
        }
        return [true, $article->id];
    }

    public function save(string $id, string $title, string $content, int $categoryId,
                         string $author, int $status, array $extra = array(), string $intro = '')
    {
        $id = $this->decodeArticleId($id);
        if (empty($id)) {
            return [false, 'id为空或不合法'];
        }
        $info = [
            'title' => $title,
            'content' => $content,
            'category_id' => $categoryId,
            'author' => $author,
            'status' => $status,
            'extra' => json_encode($extra, true),
            'intro' => $intro,
        ];
        $article = Content::findFirst([
            'id = ?0',
            'bind' => [
                $id
            ]
        ]);
        foreach ($info as $key => $value) {
            $article->$key = $value;
        }
        if (!$article->save()) {
            Log::getLogger()->info($article->getMessages());
            return [false, $article->getMessages()];
        }
        return [true, $article->id];
    }

    public function getArticle(int $id)
    {
        $id = $this->decodeArticleId($id);
        $info = Content::findFirst([
            'id = ?0',
            'bind' => [
                $id
            ]
        ]);
        return $info->toArray();
    }

    public function deleteArticle($id)
    {
        $article = Content::findFirst([
            "id='$id'"
        ]);
        if (!$article->delete()) {
            return [false, $article->getMessages()];
        }
        return [true, $id];
    }

    public function getArticleList($page, $pageSize, $categoryId = 0, $keyword = '')
    {
        $query = Content::query();
        // todo 这里添加父类分类的查询
        if ($categoryId) {
            $query->andWhere('category_id=0?', [
                $categoryId
            ]);
        }
        if (!empty($keyword)) {
            $query->andWhere('title like 0?', [
                '%' . $keyword . '%'
            ]);
        }
        $query->limit($pageSize, ($page - 1) * $pageSize);
        return $query->execute()->toArray();
    }

    public function articleNumber($categoryId = 0, $keyword = '', $status = null)
    {
        $query = Content::query()
            ->columns('count(*) as num');
        // todo 这里添加父类分类的查询
        if ($categoryId) {
            $query->andWhere('category_id=?0', [
                $categoryId
            ]);
        }
        if ($status !== null) {
            $query->andWhere('status=?0', [$status]);
        }
        if (!empty($keyword)) {
            $query->andWhere('title like ?0', [
                '%' . $keyword . '%'
            ]);
        }
        $result = $query->execute()->toArray();
        return intval($result[0]['num']);
    }

    public function updateStatusByIds(array $ids, int $status)
    {
        $phql = "UPDATE TopCms\Apps\Article\Models\Content SET status = ?0 WHERE id IN (" . implode(',', $ids)
    . ")";
        $modelsManager = Di::getDefault()->get('modelsManager');
        $result = $modelsManager->executeQuery($phql, [
            0 => $status,
        ]);

        if ($result->success() === false) {
            $msgs = [];

            $messages = $result->getMessages();

            foreach ($messages as $message) {
                $msgs[] = $message->getMessage();
            }
            return [false, $msgs];
        } else {
            return [true, 'success'];
        }

    }
}