<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/3/2下午11:35
 * @package TopCms\Apps\OpenSource\Models
 */

namespace TopCms\Apps\Activity\Models;

use TopCms\Framework\Mvc\Model\BaseModel;

/**
 * Class comment
 * @package TopCms\Apps\OpenSource\Models
 */
class comment extends BaseModel
{
    public $id;
    public $content;
    public $user_id;
    public $activity_id;
    public $status;
    public $updated_at;
    public $created_at;

    public function initialize()
    {
        $this->setSource('app_activity_comment');
    }
}