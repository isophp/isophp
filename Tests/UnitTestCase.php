<?php
/**
 * Created by PhpStorm.
 * Auth: liushuai
 * Date: 28/12/17
 * Time: 15:18
 * Email: ln6265431@163.com
 */
namespace Tests;

use TopCms\Framework\Applications\HttpApplication;
use Phalcon\Di;
use Phalcon\Http\Response;
use Phalcon\Test\UnitTestCase as PhalconTestCase;

abstract class UnitTestCase extends PhalconTestCase
{
    /**
     * todo 这里默认的是支持httpApplication，如何支持console?
     * @var HttpApplication
     */
    protected $application;

    public function __construct(?string $name = null, array $data = [], string $dataName = '')
    {
        parent::__construct($name, $data, $dataName);
    }


    public function setUp()
    {
        $di = new \Phalcon\Di();
        $application = new \Framework\Applications\HttpApplication($di);
        $this->application = $application;
        $this->setDI($di);
    }

    // todo 如何支持所有类型的请求？
    public function get(string $url, array $query = []): Response
    {
        $urlArr = parse_url($url);
        if (isset($urlArr['query'])) {
            $query = parse_url($urlArr['query']);
            $query = array_merge($query, $urlArr);
        }
        $_REQUEST = $query;
        return $this->application->handle($url);
    }

    public function post(string $url, array $query = [])
    {
        $_POST = $query;
        return $this->application->handle($url)->getContent();
    }

    public function tearDown()
    {
        parent::tearDown(); // TODO: Change the autogenerated stub
    }
}