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
class Users extends BaseModel
{

    public function initialize()
    {
        $this->setSource("app_users");
    }

    public function getTableName()
    {
        return $this->getSource();
    }
}