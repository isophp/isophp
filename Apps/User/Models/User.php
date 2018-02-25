<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/7下午5:42
 */

namespace TopCms\Apps\User\Models;

use TopCms\Framework\Mvc\Model\BaseModel;

/**
 * Class Auth
 */
class User extends BaseModel
{

    public $id;
    public $nickname;
    public $avatar;
    public $role_id;
    public $status;
    public $updated_at;
    public $created_at;
    public function initialize()
    {
        $this->belongsTo(
            'role_id',
            'TopCms\Apps\User\Models\Role',
            "id"
        );
        $this->setSource("app_user_user");
    }

}