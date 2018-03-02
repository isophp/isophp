<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/2/11下午2:59
 */
namespace TopCms\Framework\Core\FileRef;

use Phalcon\Di;
use TopCms\Apps\User\Login;
use TopCms\Framework\Exceptions\SysException;
use TopCms\Framework\Log\Log;

/**
 * Class FileManager
 */
class FileManager
{
    // 文章相关文件
    const FILE_SOURCE_ARTICLE = 'article';
    protected $fileSource = '';

    public function __construct(array $config)
    {
        if (!isset($config['fileSource'])) {
            throw new SysException('lost upload file source');
        }
        $this->fileSource = $config['fileSource'];
    }

    public function upload()
    {
        $request = Di::getDefault()->get('request');
        if ($request->hasFiles()) {
            $savePath = $this->checkSaveFilePath();
            $urls = [];
            foreach ($request->getUploadedFiles() as $file) {
                $fileId = $this->getNewFileId($this->fileSource);
                $filePath = $savePath . '/' . md5($fileId) . '.' . pathinfo($file->getName(), PATHINFO_EXTENSION);;
                $file->moveTo($filePath);
                Log::getLogger()->info($file);
                File::setTableId($fileId % 16);
                $fileModel = new File([
                    'file_id' => $fileId,
                    'file_source' => $this->fileSource,
                    // todo
                    'author' => Login::getCurUserId(),
                    'size' => $file->getSize(),
                    'file_path' => str_replace(PUBLIC_PATH, '', $filePath)
                ]);
                if (!$fileModel->save()) {
                    Log::getLogger()->info($fileModel->getStringMessages());
                }
                $urls[] = $fileModel->file_path;
            }
            return $urls;
        } else {
            return false;
        }
    }

    public function checkSaveFilePath()
    {
        $savePath = UPLOAD_PATH . '/' . $this->fileSource;
        if (!file_exists($savePath)) {
            mkdir($savePath);
        }
        $savePath .= '/' . date('Y-m-d');
        if (!file_exists($savePath)) {
            mkdir($savePath);
        }
        return $savePath;
    }

    protected function getNewFileId($source)
    {
        if (empty($source)) {
            return false;
        }
        $fileId = new FileId();
        $fileId->file_source = $source;
        $fileId->save();
        return $fileId->id;
    }
}