<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/2/11下午3:59
 * @package TopCms\Framework\Core\FileRef
 */

namespace TopCms\Framework\Core\FileRef;

use TopCms\Framework\Mvc\Model\BaseModel;

/**
 * Class FileId
 * @package TopCms\Framework\Core\FileRef
 */
class FileId extends BaseModel
{
    public $id;
    public $file_source;
    public $created_at;
    public $updated_at;

    public function initialize()
    {
        $this->setSource("app_article_file_id");
    }
}