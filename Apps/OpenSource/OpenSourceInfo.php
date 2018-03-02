<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/3/2上午11:44
 */
namespace TopCms\Apps\OpenSource;
use Phalcon\Di;
use TopCms\Apps\OpenSource\Models\Info;

/**
 * Class OpenSourceInfo
 */
class OpenSourceInfo
{

    public function detail($id)
    {
        $info = Info::findFirst([
            'conditions' => 'id=:id:',
            'bind' => [
                'id' => $id
            ]
        ]);
        if (empty($info)) {
            return [false, '开源项目不存在'];
        }
        return [true, $info->toArray()];
    }

    public function addOpenSource($params)
    {
        $canUpdateFields = array(
            'name','intro', 'language', 'url', 'github_url', 'gitee_url', 'writer',
            'writer_url', 'content', 'sort', 'status');
        $new = [];
        foreach ($params as $key => $item) {
            if (in_array($key, $canUpdateFields)) {
                if ($key === 'language') {
                    $item = implode(',', $item);
                }
                $new[$key] = $item;
            }
        }

        $info = new Info();
        if (!$info->save($new)) {
            return [false, $info->getStringMessages()];
        }
        return [true, $info->id];
    }

    public function getOpenSourceList($page, $pageSize)
    {
        return Info::query()
            ->limit($pageSize, ($page - 1) * $pageSize)->execute()->toArray();
    }


    public function update(int $id, array $info)
    {
        $sourceOpen = Info::findFirst([
            'conditions' => 'id=:id:',
            'bind' => [
                'id' => $id
            ]
        ]);
        if (empty($sourceOpen)) {
            return [false, '不存在该开源项目'];
        }
        $canUpdateFields = array(
            'name','intro', 'language', 'url', 'github_url', 'gitee_url', 'writer',
            'writer_url', 'content', 'sort', 'status');
        $update = [];
        foreach ($info as $key => $item) {
            if (in_array($key, $canUpdateFields)) {
                if ($key === 'language') {
                    $item = implode(',', $item);
                }
                $update[$key] = $item;
            }
        }
        if (!$sourceOpen->save($update)) {
            $messages = $sourceOpen->getStringMessages();
            return [false, $messages];
        }
        return [true, 'success'];
    }

    public function openSouceNumber()
    {
        return count(Info::find());
    }

    public function updateStatusByIds(array $ids, int $status)
    {
        $phql = "UPDATE TopCms\Apps\OpenSource\Models\Info SET status = ?0 WHERE id IN (" . implode(',', $ids)
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