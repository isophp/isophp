create table if not exists `app_article_content`(
  `id` int not null auto_increment comment '自增id',
  `title` varchar(256) not null comment '文章标题',
  `content` text charset utf8mb4 not null comment '文章内容',
  `category_id` smallint not null comment '分类id',
  `intro` varchar(1024) null default '' comment '文章简介',
  `author` int not null comment '作者',
  `hits_num` int not null default 0 comment '点击数',
  `comments_num` int not null default 0 comment '评论数',
  `ontop` tinyint not null default 0 comment '是否置顶',
  `status` tinyint not null default 0 comment '状态 0:草稿 1:待审核 2:发布 3:删除',
  `extra` varchar(1024) not null default '' comment '额外信息，关联图片信息，自定义字段等',
  `updated_at` datetime null default null on update current_timestamp comment '更新时间',
  `created_at` datetime not null default current_timestamp comment '创建时间',
  primary key (`id`),
  index category_status(`category_id`,`status`),
  index author_status(`author`,`status`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `app_article_category`(
  `id` int not null auto_increment comment '自增id',
  `name` varchar(128) not null comment '栏目名称',
  `parent_id` int not null default 0 comment '父节点id',
  `del` int not null default 0 comment '标识栏目是否为删除状态',
  `updated_at` datetime null default null on update current_timestamp comment '更新时间',
  `created_at` datetime not null default current_timestamp comment '创建时间',
  primary key (`id`),
  unique key name(`name`) comment '栏目唯一key'
)engine=InnoDb default charset=utf8;
create table if not exists `app_article_file_id`(
  `id` int not null auto_increment comment '自增id',
  `file_source` varchar(64) not null comment '文件类型',
  `updated_at` datetime null default null on update current_timestamp comment '更新时间',
  `created_at` datetime not null default current_timestamp comment '创建时间',
  primary key (`id`)
)engine=InnoDb default charset=utf8;
create table if not exists `app_article_file`(
  `id` int not null auto_increment comment '自增id',
  `file_id` int not null comment '全剧唯一id' ,
  `file_source` varchar(64) not null comment '文件来源',
  `author` int not null comment '上传者',
  `size` int not null comment '文件大小',
  `file_path` varchar(256) not null comment '文件路径',
  `updated_at` datetime null default null on update current_timestamp comment '更新时间',
  `created_at` datetime not null default current_timestamp comment '创建时间',
  primary key (`id`),
  unique key file_id(`file_id`)
)engine=InnoDb default charset=utf8;

create table `app_article_file_0` like `app_article_file`;
create table `app_article_file_1` like `app_article_file`;
create table `app_article_file_2` like `app_article_file`;
create table `app_article_file_3` like `app_article_file`;
create table `app_article_file_4` like `app_article_file`;
create table `app_article_file_5` like `app_article_file`;
create table `app_article_file_6` like `app_article_file`;
create table `app_article_file_7` like `app_article_file`;
create table `app_article_file_8` like `app_article_file`;
create table `app_article_file_9` like `app_article_file`;
create table `app_article_file_10` like `app_article_file`;
create table `app_article_file_11` like `app_article_file`;
create table `app_article_file_12` like `app_article_file`;
create table `app_article_file_13` like `app_article_file`;
create table `app_article_file_14` like `app_article_file`;
create table `app_article_file_15` like `app_article_file`;

create table if not exists `app_article_comment`(
  `id` int not null auto_increment comment '自增id',
  `content` varchar(1024) charset utf8mb4 not null comment '评论内容',
  `user_id` int not null comment '用户id',
  `article_id` int not null comment '博客id',
  `status` tinyint not null default 0 comment '状态 0:上线 1:下线',
  `updated_at` datetime null default null on update current_timestamp comment '更新时间',
  `created_at` datetime not null default current_timestamp comment '创建时间',
  primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;