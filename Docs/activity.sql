create table if not exists `app_activity_info`(
  `id` int not null auto_increment comment '自增id',
  `title` varchar(256) not null comment '会议名称',
  `intro` varchar(1024) not null comment '会议介绍',
  `address` varchar(256) not null comment '地址',
  `cover` varchar(256) not null comment '封面地址',
  `author_id` int not null comment '发布人',
  `start_date` datetime not null comment '会议开始时间',
  `end_date` datetime not null comment '会议结束时间',
  `start_apply` datetime not null comment '开始报名时间',
  `end_apply` datetime not null comment '结束报名时间',
  `activity_url` varchar(256) not null default '' comment '活动详情页',
  `cost` float not null default 0 comment '费用',
  `content` text CHARSET utf8mb4 not null comment '活动介绍',
  `hit_num` int not null default 0 comment '点击量',
  `comment_num` int not null default 0 comment '评论数',
  `sort` int not null default 0 comment '权重',
  `status` tinyint not null default 0 comment '状态 0:展示 1:不展示',
  `updated_at` datetime null default null on update current_timestamp comment '更新时间',
  `created_at` datetime not null default current_timestamp comment '创建时间',
  primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `app_activity_comment`(
  `id` int not null auto_increment comment '自增id',
  `content` varchar(1024) charset utf8mb4 not null comment '评论内容',
  `user_id` int not null comment '用户id',
  `activity_id` int not null comment '博客id',
  `status` tinyint not null default 0 comment '状态 0:上线 1:下线',
  `updated_at` datetime null default null on update current_timestamp comment '更新时间',
  `created_at` datetime not null default current_timestamp comment '创建时间',
  primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;