<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/13下午11:24
 * @package TopCms\Apps\Article\Handler
 */

namespace TopCms\Apps\Article\Handler;

use TopCms\Framework\Handler\BaseHandler;

/**
 * Class CategoryHandler
 * @package TopCms\Apps\Article\Handler
 */
class CategoryHandler extends BaseHandler
{
    public function listAction()
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