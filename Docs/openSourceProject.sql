create table if not exists `app_open_source_info`(
  `id` int not null auto_increment comment '自增id',
  `name` varchar(256) not null comment '项目名称',
  `intro` varchar(1024) not null comment '项目介绍',
  `language` varchar(64) not null comment '编程语言',
  `url` varchar(256) not null comment '软件首页',
  `github_url` varchar(256) not null comment 'github地址',
  `gitee_url` varchar(256) not null comment 'gitee地址',
  `writer` varchar(64) not null comment '软件作者',
  `writer_url` varchar(256) not null comment '作者主页',
  `content` text CHARSET utf8 not null comment '项目详情介绍',
  `sort` int not null default 0 comment '权重',
  `status` tinyint not null default 0 comment '状态 0:展示 1:不展示',
  `updated_at` datetime null default null on update current_timestamp comment '更新时间',
  `created_at` datetime not null default current_timestamp comment '创建时间',
  primary key (`id`),
  unique index name (`name`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;