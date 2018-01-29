<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/26下午11:45
 * @package TopCms\Apps\Article\Models
 */

namespace TopCms\Apps\Article\Models;

use Phalcon\Validation;
use Phalcon\Validation\Validator\StringLength;
use TopCms\Framework\Mvc\Model\BaseModel;

/**
 * Class Category
 * @package TopCms\Apps\Article\Models
 */
class Category extends BaseModel
{
    public $id;
    public $parent_id;
    public $name;
    public $updated_at;
    public $created_at;
    public function initialize()
    {
        $this->setSource("app_article_category");
    }
    public function validation()
    {
        $validate = new Validation();
        $validate->add('name', new StringLength([
            'max' => 128,
            'min' =>  1,
            'messageMaximum' => '栏目名过长',
            'messageMinimum' => '栏目名过短',
        ]));
        return $this->validate($validate);
    }
}