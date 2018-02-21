<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/2/21下午6:39
 */

namespace TopCms\Apps\Site;

use TopCms\Apps\Site\Models\FriendLink;
use TopCms\Framework\Log\Log;

/**
 * Class FrinendLinkInfo
 */
class FriendLinkInfo
{
    public function getFriendLinkList($page, $pageSize)
    {
        $query = FriendLink::query();
        $query->limit($pageSize, ($page - 1) * $pageSize);
        return $query->execute()->toArray();
    }

    public function friendLinkNumber()
    {
        $query = FriendLink::query()
            ->columns('count(*) as num');
        $result = $query->execute()->toArray();
        return intval($result[0]['num']);
    }

    public function updateFriendLink($id, $name = '', $url = '', $sort = '')
    {
        $friendLink = FriendLink::findFirst([
            "id='$id'"
        ]);
        if (empty($friendLink)) {
            return [false, '没有该友情链接'];
        }
        if (!empty($name)) {
            $friendLink->name = $name;
        }
        if (!empty($url)) {
            $friendLink->url = $url;
        }
        if (!empty($sort)) {
            $friendLink->sort = $sort;
        }
        if (!$friendLink->save()) {
            return [false, $friendLink->getStringMessages()];
        }
        return [true, 'success'];
    }

    public function add($name, $url, $sort = 0)
    {
        $friendLink = new FriendLink();
        $friendLink->name = $name;
        $friendLink->url = $url;
        $friendLink->sort = $sort;
        // todo 从当前登录信息里获得
        $friendLink->add_user = 'admin';
        if (!$friendLink->save()) {
            return [false, $friendLink->getStringMessages()];
        } else {
            return [true, $friendLink->id];
        }
    }

}