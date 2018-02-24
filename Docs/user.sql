create table if not exists `app_user_user`(
  `id` int not null auto_increment comment '自增id',
  `nickname` varchar(256) not null comment '昵称',
  `avatar` varchar(256) null default '' comment '头像',
  `role_id` int not null comment '角色id',
  `status` tinyint not null default 0 comment '状态 0:正常 1:禁止',
  `updated_at` datetime null default null on update current_timestamp comment '更新时间',
  `created_at` datetime not null default current_timestamp comment '创建时间',
  primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `app_user_auth`(
  `id` int not null auto_increment comment '自增id',
  `user_id` int not null comment '用户id',
  `login_type` varchar(256) not null comment '登录类型: username, weixin, weibo 等',
  `identifier` varchar(256) not null comment '登录标识:用户名或则微信账号等',
  `credential` varchar(256) not null comment '登录密码或token等',
  `status` tinyint not null default 0 comment '状态 0:可使用 1:禁止使用',
  `updated_at` datetime null default null on update current_timestamp comment '更新时间',
  `created_at` datetime not null default current_timestamp comment '创建时间',
  primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `app_user_role`(
  `id` int not null auto_increment comment '自增id',
  `name` varchar(256) not null comment '角色名',
  `status` tinyint not null default 0 comment '状态 0:正常 1:禁止',
  `updated_at` datetime null default null on update current_timestamp comment '更新时间',
  `created_at` datetime not null default current_timestamp comment '创建时间',
  primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into `app_user_role` (`name`) values('super');
insert into `app_user_role` (`name`) values('admin');
insert into `app_user_role` (`name`) values('member');
insert into `app_user_role` (`name`) values('guest');
insert into `app_user_role` (`name`) values('writer');


