<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/7下午5:41
 * @package Apps\Auth
 */

namespace TopCms\Apps\User;

/**
 * Class UserInfo
 * @package Apps\Auth
 */
class UserInfo
{
    public function getUserList($page, $pageSize)
    {
        return [
            [
                'id' => 1,
                'name' => 'Bob',
                'address' => '北京',
                'avatar' => 'http://upload.dianyingjie.com/2017/0404/1491275068881.jpeg',
                'notifyCount' => 10,
                'career' => 'PHP开发',
            ],
            [
                'id' => 2,
                'name' => 'Tom',
                'address' => '北京',
                'avatar' => 'http://upload.dianyingjie.com/2017/0404/1491275068881.jpeg',
                'notifyCount' => 10,
                'career' => 'PHP开发',
            ],
            [
                'id' => 3,
                'name' => 'zeus',
                'address' => '北京',
                'avatar' => 'http://upload.dianyingjie.com/2017/0404/1491275068881.jpeg',
                'notifyCount' => 10,
                'career' => 'PHP开发',
            ],
            [
                'id' => 4,
                'name' => 'Hero',
                'address' => '北京',
                'avatar' => 'http://upload.dianyingjie.com/2017/0404/1491275068881.jpeg',
                'notifyCount' => 10,
                'career' => 'PHP开发',
            ],
            [
                'id' => 5,
                'name' => 'Prometheus',
                'address' => '北京',
                'avatar' => 'http://upload.dianyingjie.com/2017/0404/1491275068881.jpeg',
                'notifyCount' => 10,
                'career' => 'PHP开发',
            ]
        ];
    }
}