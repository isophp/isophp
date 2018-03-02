/**
 * Created by liushuai on 2018/1/13.
 */
import React, {PureComponent} from 'react';
import {render} from 'react-dom';
import Editor from '../../../components/MdEditor';
import Style from './AddArticle.less';
import {Cascader, Spin, Col, Form, Input, message} from 'antd';
import {connect} from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';


const formItemLayout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 8,
    },
};

@connect(state => ({
    Category: state.Category,
    Article: state.Article,
}))
@Form.create()
export default class AddArticle extends PureComponent {
    state = {
        categoryId: 0,
        content: '',
        categoryInvalid: false,
        cascader: [],
    };

    componentDidMount() {
        const {dispatch} = this.props;
        const articleId = this.props.match.params.articleId;
        dispatch({
            type: 'Category/tree',
            success: function () {
                if (articleId && !isNaN(articleId)) {
                    dispatch({
                        type: 'Article/detail',
                        payload: {
                            id: articleId
                        }
                    });
                } else {
                    dispatch({
                        type: 'Article/save',
                        payload: {
                            articleInfo: {}
                        }
                    });
                }
            }
        });
    };

    markdownChange(value) {
        const {Article:{articleInfo}, dispatch} = this.props;
        dispatch({
                type: 'Article/save',
                payload: {
                    articleInfo: {
                        ...articleInfo,
                        content: value
                    }
                }
            }
        );
    };

    generateCategoryOptions = (categoryList) => {
        categoryList.forEach(function (item, index) {
            categoryList[index].value = item.id;
            categoryList[index].label = item.name;
            if (item.children) {
                categoryList[index].children = this.generateCategoryOptions(item.children);
            }
        }, this);
        return categoryList;
    };

    onCategoryChange(value, selectedOptions) {
        const {dispatch} = this.props;
        const {Article:{articleInfo}} = this.props;
        this.setState({
            categoryInvalid: false,
        });
        dispatch({
                type: 'Article/save',
                payload: {
                    articleInfo: {
                        ...articleInfo,
                        category_id: value[value.length - 1],
                        cascader: value
                    }
                }
            }
        );
    };

    submit(status) {
        const {Article:{articleInfo}, dispatch} = this.props;
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                message.warn('请正确填写信息');
                return;
            }
            if (!articleInfo.category_id) {
                this.setState({
                    categoryInvalid: true
                });
                message.warn('请选择栏目');
                return;
            }
            if (articleInfo.content.length == 0) {
                message.warn('文章内容不能为空');
                return;
            }
            if (articleInfo.id) {
                dispatch({
                        type: 'Article/update',
                        payload: {
                            id: articleInfo.id,
                            content: articleInfo.content,
                            categoryId: articleInfo.category_id,
                            status: status,
                            ...fieldsValue
                        },
                        success: function () {
                            message.success('更新成功！！');
                        }
                    }
                );
            } else {
                dispatch({
                        type: 'Article/add',
                        payload: {
                            content: articleInfo.content,
                            categoryId: articleInfo.category_id,
                            status: status,
                            ...fieldsValue
                        },
                        success: function () {
                            message.success('保存成功!!');
                        }
                    }
                );
            }
        });
    };

    render() {
        const {getFieldDecorator, getFieldValue, onSubmit} = this.props.form;
        const {Article:{loading: articleLoading,
            articleInfo:{category_id:categoryId, content, title, id:articleId, cascader}}} = this.props;
        const {Category: {tree}} = this.props;
        const options = this.generateCategoryOptions(tree);
        let editor = <div></div>;
        if (!this.props.match.params.articleId || (this.props.match.params.articleId
            &&this.props.match.params.articleId == articleId && content && content.length)) {
            editor = <Editor onSave={this.submit.bind(this)} onChange={this.markdownChange.bind(this)} config={
                {
                    toolbarIcons: function () {
                        return ["bold", "del", "italic", "quote", "|",
                            "list-ul", "list-ol", "hr", "|",
                            "link", "reference-link", "image", "table", "datetime", "html-entities", "|",
                            "goto-line", "watch", "preview", "fullscreen", "search", "|", "save"
                        ];
                    },
                    toolbarIconsClass: {
                        save: "fa-floppy-o"  // 指定一个FontAawsome的图标类
                    },
                    toolbarIconTexts: {
                        save: "保存"  // 如果没有图标，则可以这样直接插入内容，可以是字符串或HTML标签
                    },
                    toolbarHandlers: {
                        save: function (cm, icon, cursor, selection) {
                            this.settings.mySave();
                        }
                    },
                    path: '/js/',
                    autoLoadModules: true,
                    toolbarAutoFixed: false,
                    placeholder: 'coding now!',
                    codeFold: true,
                    markdown: content || '',
                    onload: (editor, func) => {
                        let md = editor.getMarkdown();
                        let html = editor.getHTML();
                    },
                    imageUpload    : true,
                    imageFormats   : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                    imageUploadURL : "/article/upload",
                }
            }/>
        }
        return <PageHeaderLayout>
            <Spin spinning={articleLoading}>
            <div className={Style.content}>
                <Form layout="horizontal" hideRequiredMark onSubmit={this.submit}>
                    <Form.Item
                        {...formItemLayout}
                        label="标题"
                    >
                        {getFieldDecorator('title', {
                            placeholer: '文章标题',
                            rules: [{
                                min: 4, message: '最小长度4'
                            }, {
                                max: 50, message: '最大长度为50'
                            }, {
                                required: true,
                                message: '请填写标题',
                            }],
                            initialValue: title
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="栏目"
                        className={this.state.categoryInvalid ? "has-error" : ""}
                    >
                        <Cascader
                            onChange={this.onCategoryChange.bind(this)}
                            options={options}
                            placeholder="文章栏目"
                            showSearch
                            value={cascader}
                        />
                    </Form.Item>
                </Form>
                {editor}
            </div>
            </Spin>
        </PageHeaderLayout>
    }
}