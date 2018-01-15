<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 27/12/17
 * Time: 13:58
 * Email: ln6265431@163.com
 */
use Phalcon\Cli\Task;

class TestTask extends Task
{
    public function encodeAction($params)
    {
        var_dump($ret->toArray());exit;
        $articleInfo = new \TopCms\Apps\Article\ArticleInfo();
        var_dump($articleInfo->encodeArticleId($params[0]));
    }

    public function decodeAction($params)
    {
        $articleInfo = new \TopCms\Apps\Article\ArticleInfo();
        var_dump($articleInfo->decodeArticleId($params[0]));
    }

    public function mainAction($params)
    {
        echo "脚本测试！！" . "\n";
        $user = new \TopCms\Apps\User\Models\User();
        echo "调用model测试！！" . $user->getTableName() . PHP_EOL;
        var_export($params);
    }
}