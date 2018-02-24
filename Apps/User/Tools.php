<?php
/**
 *
 * @author ln6265431@163.com
 * @date: 2018/2/23下午8:58
 * @package TopCms\Apps\User
 */

namespace TopCms\Apps\User;

/**
 * Class Tools
 * @package TopCms\Apps\User
 */
class Tools
{
    protected static $email = '/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/';
    protected static $phone = '/^1[\d]{10}$/';
    protected static $username = '/^[\w]{5,20}$/';

    public static function isInvalidEmail($email)
    {
        return preg_match(self::$email, $email);
    }

    public static function isInvalidPhone($phone)
    {
        return preg_match(self::$phone, $phone);
    }

    public static function isInvalidUsername($username)
    {
        return preg_match(self::$username, $username);
    }

    public static function checkIdentifierType($identifier)
    {
        if (self::isInvalidEmail($identifier)) {
            return 'email';
        }
        if (self::isInvalidPhone($identifier)) {
            return 'phone';
        }
        if (self::isInvalidUsername($identifier)) {
            return 'username';
        }
        return false;
    }
}