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

/**
 * Class ArticleInfo
 */
class ArticleInfo
{
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

    public function getArticle($id)
    {
        $id = $this->decodeArticleId($id);
        $info = Content::findFirst([
            'id = ?0',
            'bind' => [
                $id
            ]
        ]);
        return $info;
    }
}