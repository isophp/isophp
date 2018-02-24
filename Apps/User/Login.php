<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/2/23上午11:27
 * @package TopCms\Apps\User
 */

namespace TopCms\Apps\User;

use Phalcon\Di;
use Phalcon\Session\Adapter;
use TopCms\Apps\User\Models\Auth;
use TopCms\Apps\User\Models\User;
use TopCms\Framework\Core\Security\BcryptHasher;

/**
 * Class Login
 * @package TopCms\Apps\User
 */
class Login
{
    /**
     *
     * @var Adapter
     */
    protected $session;
    protected static $curUser;
    public function __construct()
    {
        $this->session = Di::getDefault()->get('session');
    }

    public function getLoginType()
    {
        return $this->session->get('login_type');
    }

    public function getLoginIdentifier()
    {
        return $this->session->get('identifier');
    }

    public function getCurUser()
    {
        if (self::$curUser) {
            return self::$curUser;
        }
        if (!$this->session->has('user_id')) {
            return false;
        }
        if (!$this->checkLoginToken()) {
            return false;
        }
        $curUser = User::findFirst([
            "conditions" => "id=:userId:",
            "bind" => [
                "userId" => $this->session->get('user_id')
            ]
        ]);
        self::$curUser = $curUser;
        return $curUser;
    }

    public function login($identifier, $credential, $identifierType  = '')
    {
        if (empty($identifierType)) {
            $identifierType = Tools::checkIdentifierType($identifier);
        }
        if (!$identifierType) {
            return false;
        }
        $userAuth = Auth::findFirst([
            'conditions' => 'login_type=:loginType: and identifier=:identifier:',
            'bind' => [
                'loginType' => $identifierType,
                'identifier' => $identifier
            ]
        ]);
        if (!$userAuth) {
            return false;
        }
        $bcryptHasher = new BcryptHasher();

        if (!$bcryptHasher->check($credential, $userAuth->credential)) {
            return false;
        }

        $login_token = $this->generateLoginToken();

        $this->session->set('login_token', $login_token);
        $this->session->set('user_id', $userAuth->user_id);
        $this->session->set('login_type', $identifierType);
        $this->session->set('identifier', $identifier);
        return true;
    }

    protected function generateLoginToken()
    {
        $request = Di::getDefault()->get('request');
        return md5($request->getUserAgent() . $request->getClientAddress(true));
    }

    protected function checkLoginToken()
    {
        $token = $this->generateLoginToken();
        if (!$this->session->has('login_token') ||
            $this->session->get('login_token') !== $token) {
            return false;
        }
        return true;
    }
}