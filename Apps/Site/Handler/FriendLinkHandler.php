<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/2/21下午6:40
 */

namespace TopCms\Apps\Site\Handler;

use TopCms\Apps\Site\FriendLinkInfo;
use TopCms\Framework\Exceptions\ApiParamErrorException;
use TopCms\Framework\Mvc\Handler\BaseHandler;

/**
 * Class FriendLinkHandler
 */
class FriendLinkHandler extends BaseHandler
{
    public function listAction($params)
    {
        $currentPage = $params['currentPage'] ?? 1;
        $pageSize = $params['pageSize'] ?? 10;
        $friendLinkInfo = new FriendLinkInfo();
        $list = $friendLinkInfo->getFriendLinkList($currentPage, $pageSize);
        $total = $friendLinkInfo->friendLinkNumber();
        $data = [
            'list' => $list,
            'pagination' => [
                'current' => intval($currentPage),
                'pageSize' => intval($pageSize),
                'total' => $total,
            ]
        ];
        $this->successJson($data);
    }

    public function updateAction($params)
    {
        $id = $params['id'] ?? '';
        $name = $params['name'] ?? '';
        $url = $params['url'] ?? '';
        $sort = $params['sort'] ?? null;
        if (!is_numeric($id) || (empty($name) && empty($url) && empty($sort))) {
            throw new ApiParamErrorException('param lost');
        }
        $friendLinkInfo = new FriendLinkInfo();
        list($status, $message) = $friendLinkInfo->updateFriendLink($id, $name, $url, $sort);
        if ($status) {
            $this->successJson(['msg' => $message]);
        } else {
            $this->failJson(['msg' => $message]);
        }
    }

    public function addAction($params)
    {
        $name = $params['name'] ?? '';
        $url = $params['url'] ?? '';
        $sort = $params['sort'] ?? 0;
        if (empty($name) || empty($url)) {
            throw new ApiParamErrorException('param error');
        }
        $friendLinkInfo = new FriendLinkInfo();
        list($status, $message) = $friendLinkInfo->add($name, $url, $sort);
        if ($status) {
            $this->successJson(['id' => $message]);
        } else {
            $this->failJson(['msg' => $message]);
        }
    }

    public function changeStatusAction()
    {

    }
}