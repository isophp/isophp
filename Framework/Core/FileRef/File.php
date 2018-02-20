<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/2/11下午2:59
 */

namespace TopCms\Framework\Core\FileRef;

use TopCms\Framework\Mvc\Model\BaseModel;

/**
 * Class File
 */
class File extends BaseModel
{
    public $id;
    public $file_id;
    public $file_source;
    public $author;
    public $size;
    public $file_path;
    public $created_at;
    public $updated_at;

    static $tableId = 0;

    static public function setTableId($id)
    {
        self::$tableId = $id;
    }
    public function onConstruct()
    {
        $this->setSource("app_article_file_" . self::$tableId);
    }
}