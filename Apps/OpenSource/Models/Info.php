<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/3/2上午11:33
 */
namespace TopCms\Apps\OpenSource\Models;
use TopCms\Framework\Mvc\Model\BaseModel;

/**
 * Class Info
 */
class Info extends BaseModel
{
    public $id;
    public $name;
    public $intro;
    public $language;
    public $url;
    public $github_url;
    public $gitee_url;
    public $writer;
    public $writer_url;
    public $content;
    public $sort;
    public $status;
    public $updated_at;
    public $created_at;

    public function initialize()
    {
        $this->setSource("app_open_source_info");
    }
}