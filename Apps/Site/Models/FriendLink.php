<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/2/21下午6:37
 * @package TopCms\Apps\Site\Models
 */

namespace TopCms\Apps\Site\Models;

use TopCms\Framework\Mvc\Model\BaseModel;

/**
 * Class FriendLink
 * @package TopCms\Apps\Site\Models
 */
class FriendLink extends BaseModel
{
    public $id;
    public $name;
    public $url;
    public $add_user;
    public $sort;
    public $status;
    public $updated_at;
    public $created_at;

    public function initialize()
    {
        $this->setSource("app_site_friend_link");
    }
}