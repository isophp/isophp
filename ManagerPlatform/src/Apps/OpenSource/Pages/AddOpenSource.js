/**
 * Created by liushuai on 2018/3/2.
 */
import React, {PureComponent} from 'react';
import {render} from 'react-dom';
import {Select, Spin, Col, Form, Input, message, Button, InputNumber} from 'antd';
import {connect} from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import FooterToolbar from '../../../components/FooterToolbar';
const Option = Select.Option;
const TextArea = Input.TextArea;
const FormItem = Form.Item;
import Style from './AddOpenSource.less';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

@connect(state => ({
    OpenSource: state.OpenSource
}))
@Form.create()
export default class addOpenSource extends PureComponent {
    state = {
    };
    handleHTMLChange(content){
        const {dispatch} = this.props;
        const {OpenSource:{info}} = this.props;
        dispatch({
            type: 'OpenSource/save',
            payload: {
                info : {
                    ...info,
                    content: content
                }
            }
        });
    };
    submit() {
        const {OpenSource: {info}, dispatch} = this.props;
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                message.warn('请正确填写信息');
                return;
            }
            if (info.content && info.content.length == 0) {
                message.warn('文章内容不能为空');
                return;
            }
            if (info.id) {
                dispatch({
                        type: 'OpenSource/update',
                        payload: {
                            id: info.id,
                            content: info.content,
                            ...fieldsValue
                        }
                    }
                );
            } else {
                dispatch({
                        type: 'OpenSource/add',
                        payload: {
                            content: info.content,
                            ...fieldsValue
                        }
                    }
                );
            }
        });
    }
    componentDidMount() {
        const {dispatch,history} = this.props;
        const openSourceId = this.props.match.params.openSourceId;
        if (openSourceId && !isNaN(openSourceId)) {
            dispatch({
                type: 'OpenSource/detail',
                payload: {
                    id: openSourceId
                },
                fail: function () {
                    history.push('/openSource/add');
                }
            });
        } else {
            dispatch({
                type: 'OpenSource/save',
                payload: {
                    info: {}
                }
            });
        }
    };
    render = () => {
        const {getFieldDecorator} = this.props.form;
        const {OpenSource:{info, addLoading}} = this.props;
        const languages = ['PHP', 'C', 'C++', 'JAVA'];
        const options = [];
        languages.forEach(function (item) {
            options.push(<Option key={item}>{item}</Option>);
        });
        if (!info.sort) {
            info.sort = 0;
        } else {
            info.sort = parseInt(info.sort);
        }
        const editorProps = {
            contentFormat: 'html',
            placeholder: 'Hello World!',
            initialContent: info.content || '',
            onHTMLChange: this.handleHTMLChange.bind(this),
            viewWrapper: '.articleContent',
        };
        return <PageHeaderLayout>
            <Spin spinning={addLoading}>
                <div className={Style.content}>
                    <Form>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="项目名"
                        >
                            {getFieldDecorator('name', {
                                rules: [
                                    {required: true, message: '请输入项目名'},
                                    {type: 'string'},
                                    {max: 64}
                                ],
                                initialValue: info.name
                            })(
                                <Input placeholder="请输入项目名"/>
                            )}
                        </FormItem>

                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="项目简介"
                        >
                            {getFieldDecorator('intro', {
                                rules: [
                                    {required: true, message: '请输入项目简介'},
                                    {type: 'string'},
                                    {max: 512}
                                ],
                                initialValue: info.intro,
                            })(
                                <TextArea placeholder="项目简介～" autosize={{minRows: 2, maxRows: 10}}/>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="语言"
                        >
                            {getFieldDecorator('language', {
                                rules: [
                                    {required: true, message: '请选择开源项目语言'},
                                ],
                                initialValue: info.language && info.language.split(',')
                            })(
                                <Select
                                    mode="multiple"
                                    placeholder="选择语言"
                                    style={{width: '100%'}}
                                >
                                    {options}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="项目主页"
                        >
                            {getFieldDecorator('url', {
                                rules: [
                                    {required: true, message: '请输入链接名'},
                                    {type: 'url', message: '请输入正确链接地址'},
                                    {max: 128, message: '地址过长'}
                                ],
                                initialValue: info.url
                            })(
                                <Input placeholder="请输入链接名"/>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="github地址"
                        >
                            {getFieldDecorator('github_url', {
                                rules: [
                                    {required: true, message: '请输入链接地址'},
                                    {type: 'url', message: '请输入正确链接地址'},
                                    {max: 128, message: '地址过长'}
                                ],
                                initialValue: info.github_url
                            })(
                                <Input placeholder="请输入链接名"/>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="gitee地址"
                        >
                            {getFieldDecorator('gitee_url', {
                                rules: [
                                    {required: true, message: '请输入链接地址'},
                                    {type: 'url', message: '请输入正确链接地址'},
                                    {max: 128, message: '地址过长'}
                                ],
                                initialValue: info.gitee_url
                            })(
                                <Input placeholder="请输入链接名"/>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="作者"
                        >
                            {getFieldDecorator('writer', {
                                rules: [
                                    {required: true, message: '请输入作者名'},
                                    {type: 'string'},
                                    {max: 32}
                                ],
                                initialValue: info.writer
                            })(
                                <Input placeholder="请输入作者名"/>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="作者主页"
                        >
                            {getFieldDecorator('writer_url', {
                                rules: [
                                    {required: true, message: '请输入链接地址'},
                                    {type: 'url', message: '请输入正确链接地址'},
                                    {max: 128, message: '地址过长'}
                                ],
                                initialValue: info.writer_url
                            })(
                                <Input placeholder="请输入链接名"/>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="排序权重"
                        >
                            {getFieldDecorator('sort', {
                                rules: [
                                    {required: true, message: '请输入整数权重'},
                                    {type: 'number', message: '请输入整数'}
                                ],
                                initialValue: info.sort
                            })(
                                <InputNumber placeholder="请输入链接名"/>
                            )}
                        </FormItem>
                    </Form>
                    <div className="articleContent">
                        <BraftEditor {...editorProps}/>
                    </div>
                    <FooterToolbar style={{ width: this.state.width }}>
                        <Button type="primary" onClick={this.submit.bind(this)} loading={false}>
                            提交
                        </Button>
                    </FooterToolbar>
                </div>
            </Spin>
        </PageHeaderLayout>
    }
}