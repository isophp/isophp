create table if not exists `app_blog_blog`(
  `id` int not null auto_increment comment '自增id',
  `title` varchar(256) not null comment '文章标题',
  `content` text not null comment '文章内容',
  `intro` varchar(1024) null default '' comment '文章简介',
  `type_id` int not null default 0 comment '文章分类id',
  `author` int not null comment '作者',
  `hits_num` int not null default 0 comment '点击数',
  `comments_num` int not null default 0 comment '评论数',
  `ontop` tinyint not null default 0 comment '是否置顶',
  `status` tinyint not null default 0 comment '状态 0:草稿 1:待审核 2:发布 3:删除',
  `extra` varchar(1024) not null default '' comment '额外信息，关联图片信息，自定义字段等',
  `updated_at` datetime null default null on update current_timestamp comment '更新时间',
  `created_at` datetime not null default current_timestamp comment '创建时间',
  primary key (`id`),
  index title(`title`),
  index category_status(`type_id`,`status`),
  index author_status(`author`,`status`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `app_blog_type`(
  `id` int not null auto_increment comment '自增id',
  `name` varchar(16) not null comment '分类名',
  `status` tinyint not null default 0 comment '状态 0:上线 1:下线',
  `updated_at` datetime null default null on update current_timestamp comment '更新时间',
  `created_at` datetime not null default current_timestamp comment '创建时间',
  primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;