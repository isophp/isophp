<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/3/2上午11:44
 */
namespace TopCms\Apps\Activity;
use Phalcon\Di;
use TopCms\Apps\Activity\Models\Info;
use TopCms\Apps\User\Login;

/**
 * Class OpenSourceInfo
 */
class ActivityInfo
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

    public function add($params)
    {
        $canUpdateFields = array(
            'title','address', 'cover', 'start_date', 'end_date', 'start_apply', 'end_apply',
            'activity_url', 'cost', 'content', 'sort', 'intro');
        $new = [];
        foreach ($params as $key => $item) {
            if (in_array($key, $canUpdateFields)) {
                $new[$key] = $item;
            }
        }
        $new['author_id'] = Login::getCurUserId();

        $info = new Info();
        if (!$info->save($new)) {
            return [false, $info->getStringMessages()];
        }
        return [true, $info->id];
    }

    public function getList($page, $pageSize)
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
            'title','address', 'cover', 'start_date', 'end_date', 'start_apply', 'end_apply',
            'activity_url', 'cost', 'content', 'sort', 'intro');
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

    public function number()
    {
        return count(Info::find());
    }

    public function updateStatusByIds(array $ids, int $status)
    {
        $phql = "UPDATE TopCms\Apps\Activity\Models\Info SET status = ?0 WHERE id IN (" . implode(',', $ids)
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