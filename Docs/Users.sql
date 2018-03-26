CREATE TABLE IF NOT EXISTS `app_users` (
  `user_id` INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT '用户自增id',
  `user_email` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '用户邮箱，可用于登录',
  `user_phone` VARCHAR(16) NOT NULL DEFAULT '' COMMENT '用户手机号码，可用于登录',
  `user_name` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '用户名，可用于登录',
  `user_password` VARCHAR(32) NOT NULL DEFAULT '123456' COMMENT '用户密码',
  `user_sex` ENUM('F', 'M', 'S') NOT NULL DEFAULT 'S' COMMENT '用户性别F:女，M：男，S：保密',
  `user_nickname` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '用户昵称',
  `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT '主用户表';

CREATE TABLE IF NOT EXISTS `app_token` (
  `user_id` INT(11) COMMENT '用户ID',
  `token` CHAR(64) COMMENT '用户token',
  `expires` int(11) NOT NULL DEFAULT 0 COMMENT '用户定义token失效时间',
  `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  KEY `user_id` (`user_id`),
  KEY `token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT '主用户表token表';

CREATE TABLE IF NOT EXISTS `app_users_common` (
  `user_common_id` INT(11) PRIMARY KEY COMMENT '用户附表id',
  `user_id` INT(11) NOT NULL DEFAULT 0 COMMENT '关联用户表id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT '用户附表';