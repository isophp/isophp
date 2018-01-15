<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/1/13下午9:22
 */
namespace TopCms\Apps\Article\Models;
use Phalcon\Mvc\Model;
use Phalcon\Validation;
use Phalcon\Validation\Validator\InclusionIn;
use Phalcon\Validation\Validator\PresenceOf;
use Phalcon\Validation\Validator\StringLength;

/**
 * Class Article
 */
class Content extends Model
{
    public $id;
    public $title;
    public $content;
    public $category_id;
    public $intro;
    public $author;
    public $hits_num;
    public $comments_num;
    public $ontop;
    public $status;
    public $extra;
    public $updated_at;
    public $created_at;

    public function validation()
    {
//        $validator = new Validation();
//        $validator->add(['title', 'content'], new StringLength([
//            'max' => [
//                'title' => 250,
//                'content' => 6500,
//            ],
//            'min' => [
//                'title' => 5,
//                'content' => 1,
//            ],
//            'messageMaximum' => [
//                'title' => '标题过长',
//                'content' => '内容过长'
//            ],
//            'messageMinimum' => [
//                'title' => '标题过短',
//                'content' => '内容不能为空'
//            ],
//        ]));
//        $validator->add([
//            'title',
//            'content',
//            'category_id',
//            'author',
//            'status',
//        ],new PresenceOf([
//            'message' => [
//                'title' => '标题字段缺失',
//                'content' => '文章内容字段缺失',
//                'category_id' => '栏目字段缺失',
//                'author' => '用户字段缺失',
//                'status' => '状态字段缺失'
//            ]
//        ]));
//
//        $validator->add([], new InclusionIn([
//            'message' => '状态字段不可取',
//            'domain' => [0,1,2,3],
//        ]));
    }

    public function initialize()
    {
        $this->setSource("app_article_content");
    }
}