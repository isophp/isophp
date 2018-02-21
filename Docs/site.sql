create table if not exists `app_site_friend_link`(
  `id` int not null auto_increment comment '自增id',
  `name` varchar(256) not null comment '站点名',
  `url` varchar(256) not null comment '站点连接',
  `add_user` varchar(256) not null comment '添加者id',
  `sort` int not null default 0 comment '权重',
  `status` tinyint not null default 0 comment '状态 0:展示 1:不展示',
  `updated_at` datetime null default null on update current_timestamp comment '更新时间',
  `created_at` datetime not null default current_timestamp comment '创建时间',
  primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;