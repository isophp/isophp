<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/2/23下午9:14
 * @package TopCms\Apps\User\Models
 */

namespace TopCms\Apps\User\Models;

use TopCms\Framework\Mvc\Model\BaseModel;

/**
 * Class Auth
 * @package TopCms\Apps\User\Models
 */
class Auth extends BaseModel
{
    public $id;
    public $user_id;
    public $login_type;
    public $identifier;
    public $credential;
    public $status;
    public $updated_at;
    public $created_at;
    public function initialize()
    {
        $this->setSource("app_user_auth");
    }
}