<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/7下午5:42
 */

namespace TopCms\Apps\User\Models;

use Phalcon\Mvc\Model;

/**
 * Class Auth
 */
class User extends Model
{

    public function initialize()
    {
        $this->setSource("User");
    }

    public function getTableName()
    {
        return $this->getSource();
    }
}