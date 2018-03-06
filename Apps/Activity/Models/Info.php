<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/3/2上午11:33
 */
namespace TopCms\Apps\Activity\Models;
use TopCms\Framework\Mvc\Model\BaseModel;

/**
 * Class Info
 */
class Info extends BaseModel
{
    public $id;
    public $title;
    public $address;
    public $cover;
    public $author_id;
    public $start_date;
    public $end_date;
    public $start_apply;
    public $end_apply;
    public $activity_url;
    public $cost;
    public $content;
    public $add_user;
    public $hit_num;
    public $comment_num;
    public $sort;
    public $status;
    public $updated_at;
    public $created_at;

    public function initialize()
    {
        $this->setSource("app_activity_info");
    }
}