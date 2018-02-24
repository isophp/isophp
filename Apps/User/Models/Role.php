<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 09/01/18
 * Time: 11:12
 * Email: ln6265431@163.com
 */

namespace TopCms\Apps\User\Models;

use TopCms\Framework\Mvc\Model\BaseModel;

class Role extends BaseModel
{
    public $id;
    public $name;
    public $status;
    public $updated_at;
    public $created_at;

    public function initialize()
    {
        $this->setSource("app_user_role");
    }
}