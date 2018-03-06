<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/3/2上午11:14
 */
namespace TopCms\Apps\Activity\Handler;

use TopCms\Apps\Activity\ActivityInfo;
use TopCms\Framework\Exceptions\ApiParamErrorException;
use TopCms\Framework\Mvc\Handler\BaseHandler;

/**
 * Class OpenSourceHandler
 */
class ActivityHandler extends BaseHandler
{
    public function listAction($params)
    {
        $currentPage = $params['currentPage'] ?? 1;
        $pageSize = $params['pageSize'] ?? 10;
        $friendLinkInfo = new ActivityInfo();
        $list = $friendLinkInfo->getList($currentPage, $pageSize);
        $total = $friendLinkInfo->number();
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

    public function addAction($params)
    {
        if (empty($params)) {
            throw new ApiParamErrorException('param can not be empty');
        }
        $info = new ActivityInfo();
        list($status, $message) = $info->add($params);
        if ($status) {
            $this->successJson(['id' => $message]);
        } else {
            $this->failJson(['msg' => $message]);
        }
    }

    public function updateAction($params)
    {
        $id = $params['id'] ?? '';
        if (empty($id)) {
            throw new ApiParamErrorException('lost param id');
        }
        $info = new ActivityInfo();
        list($status, $message) = $info->update($id, $params);
        if ($status) {
            $this->successJson(['msg' => $message]);
        } else {
            $this->failJson(['msg' => $message]);
        }
    }

    public function detailAction($params)
    {
        $id = $params['id'] ?? '';
        if (empty($id)) {
            throw new ApiParamErrorException('lost param id');
        }
        $info = new ActivityInfo();
        list($status, $message) = $info->detail($id);
        if ($status) {
            $this->successJson($message);
        } else {
            $this->failJson(['msg' => $message]);
        }
    }

    public function updateStatusByIdsAction($params)
    {
        $ids = $params['ids'] ?? 0;
        $ids = explode(',', $ids);
        $status = $params['status'] ?? null;
        $ids = array_filter($ids, function($id) {
            return is_numeric($id);
        });
        if (empty($ids) || !in_array($status, array(0, 1))) {
            throw new ApiParamErrorException('参数丢失或错误');
        }
        $info = new ActivityInfo();
        list($status, $message) = $info->updateStatusByIds($ids, $status);

        if ($status) {
            $this->successJson(['msg' => 'success']);
        } else {
            $this->failJson(['msg' => $message]);
        }
    }
}