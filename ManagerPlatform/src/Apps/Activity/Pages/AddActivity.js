/**
 * Created by liushuai on 2018/3/2.
 */
import React, {PureComponent} from 'react';
import {render} from 'react-dom';
import {DatePicker, Select, Spin, Upload, Form, Input, message, Button, InputNumber, Icon} from 'antd';
import {connect} from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import FooterToolbar from '../../../components/FooterToolbar';
const Option = Select.Option;
const TextArea = Input.TextArea;
const FormItem = Form.Item;
const {RangePicker} = DatePicker;
import Style from './AddActivity.less';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import moment from 'moment';

@connect(state => ({
    Activity: state.Activity
}))
@Form.create()
export default class addActivity extends PureComponent {
    state = {
        uploadImage: false,
        imageUrl: false
    };
    handleHTMLChange(content){
        const {dispatch} = this.props;
        const {Activity:{info}} = this.props;
        dispatch({
            type: 'Activity/save',
            payload: {
                info : {
                    ...info,
                    content: content
                }
            }
        });
    };
    handleCoverChange(info) {
        if (info.file && info.file.response && info.file.response.status == 0) {
            this.setState({
                imageUrl: info.file.response.data.url
            });
        }
    };
    submit() {
        const {Activity: {info}, dispatch} = this.props;
        const {imageUrl} = this.state;
        this.props.form.validateFields((err, fieldsValue) => {
            console.log(fieldsValue);
            if (err) {
                message.warn('请正确填写信息');
                return;
            }
            if (info.content && info.content.length == 0) {
                message.warn('文章内容不能为空');
                return;
            }
            if (!imageUrl) {
                message.warn('请上传封面');
                return;
            }
            fieldsValue.cover = imageUrl;
            fieldsValue.start_date = fieldsValue.activity_time[0].format('YYYY-MM-DD HH:MM:SS');
            fieldsValue.end_date = fieldsValue.activity_time[1].format('YYYY-MM-DD HH:MM:SS');
            delete fieldsValue.activity_time;
            fieldsValue.start_apply = fieldsValue.apply_time[0].format('YYYY-MM-DD HH:MM:SS');
            fieldsValue.end_apply = fieldsValue.apply_time[1].format('YYYY-MM-DD HH:MM:SS');
            delete fieldsValue.apply_time;
            fieldsValue.content = info.content;
            if (info.id) {
                dispatch({
                        type: 'Activity/update',
                        payload: {
                            id: info.id,
                            content: info.content,
                            ...fieldsValue
                        }
                    }
                );
            } else {
                dispatch({
                        type: 'Activity/add',
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
        const activityId = this.props.match.params.activityId;
        if (activityId && !isNaN(activityId)) {
            dispatch({
                type: 'Activity/detail',
                payload: {
                    id: activityId
                },
                fail: function () {
                    history.push('/activity/add');
                }
            });
        } else {
            dispatch({
                type: 'Activity/save',
                payload: {
                    info: {}
                }
            });
        }
    };
    beforeUpload(file) {
        // todo 添加更多图片类型
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    };
    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    render = () => {
        let {imageUrl} = this.state;
        const {getFieldDecorator} = this.props.form;
        const {Activity:{info, addLoading}} = this.props;
        const languages = ['PHP', 'C', 'C++', 'JAVA'];
        const options = [];
        languages.forEach(function (item) {
            options.push(<Option key={item}>{item}</Option>);
        });
        if (info.cover) {
            imageUrl = info.cover;
        }
        if (!info.sort) {
            info.sort = 0;
        } else {
            info.sort = parseInt(info.sort);
        }
        const dateFormat = "YYYY-MM-DD HH:MM";
        const editorProps = {
            contentFormat: 'html',
            placeholder: 'Hello World!',
            initialContent: info.content || '',
            onHTMLChange: this.handleHTMLChange.bind(this),
            viewWrapper: '.articleContent',
            media: {
                uploadFn: function (param) {
                    const serverURL = '/activity/upload';
                    const xhr = new XMLHttpRequest;
                    const fd = new FormData();

                    const successFn = (response) => {
                        // 假设服务端直接返回文件上传后的地址
                        // 上传成功后调用param.success并传入上传后的文件地址
                        const data = JSON.parse(xhr.responseText);
                        if (data.status == -1) {
                            param.error({
                                msg: 'unable to upload.'
                            });
                            return;
                        } else {
                            param.success({
                                url: data.data.url
                            })
                        }
                    }

                    const progressFn = (event) => {
                        // 上传进度发生变化时调用param.progress
                        param.progress(event.loaded / event.total * 100)
                    }

                    const errorFn = (response) => {
                        // 上传发生错误时调用param.error
                        param.error({
                            msg: 'unable to upload.'
                        })
                    }

                    xhr.upload.addEventListener("progress", progressFn, false)
                    xhr.addEventListener("load", successFn, false)
                    xhr.addEventListener("error", errorFn, false)
                    xhr.addEventListener("abort", errorFn, false)

                    fd.append('file', param.file)
                    xhr.open('POST', serverURL, true)
                    xhr.send(fd)
                }
            }
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.uploadImage ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return <PageHeaderLayout>
            <Spin spinning={addLoading}>
                <div className={Style.content}>
                    <Form>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="活动名"
                        >
                            {getFieldDecorator('title', {
                                rules: [
                                    {required: true, message: '请输入活动名'},
                                    {type: 'string'},
                                    {max: 64}
                                ],
                                initialValue: info.title
                            })(
                                <Input placeholder="请输入活动名"/>
                            )}
                        </FormItem>

                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="活动简介"
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
                            label="活动地址"
                        >
                            {getFieldDecorator('address', {
                                rules: [
                                    {required: true, message: '请输入地址'},
                                    {type: 'string'},
                                    {max: 100}
                                ],
                                initialValue: info.address,
                            })(
                                <TextArea placeholder="请输入地址" autosize={{minRows: 2, maxRows: 10}}/>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="费用"
                        >
                            {getFieldDecorator('cost', {
                                rules: [
                                    {required: true, message: '请输入费用'},
                                    {type: 'number', message: '请输入费用'}
                                ],
                                initialValue: info.cost
                            })(
                                <InputNumber placeholder="请输入费用"/>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="报名时间"
                        >
                            {getFieldDecorator('apply_time', {
                                rules: [{ type: 'array', required: true, message: '请选择报名时间!' }],
                                initialValue:[
                                    moment(info.start_date, dateFormat),
                                    moment(info.end_date, dateFormat)
                                ]
                            })(
                                <RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    format={dateFormat}
                                    placeholder={['开始时间', '结束时间']}
                                />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="会议时间"
                        >
                            {getFieldDecorator('activity_time', {
                                rules: [{ type: 'array', required: true, message: '请选择会议时间!' }],
                                initialValue:[
                                    moment(info.start_apply, dateFormat),
                                    moment(info.end_apply, dateFormat)
                                ]
                            })(
                                <RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    format= {dateFormat}
                                    placeholder={['开始时间', '结束时间']}
                                />
                            )}

                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="活动主页"
                        >
                            {getFieldDecorator('activity_url', {
                                rules: [
                                    {required: true, message: '请输入活动主页地址'},
                                    {type: 'url', message: '请输入活动主页地址'},
                                    {max: 128, message: '地址过长'}
                                ],
                                initialValue: info.activity_url
                            })(
                                <Input placeholder="请输入活动主页地址"/>
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
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 8}}
                            label="封面"
                        >
                            {getFieldDecorator('cover', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                                rules: [{ type: 'array', required: true, message: '请上传封面!' }]
                            })(
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                showUploadList={false}
                                action="/activity/upload"
                                beforeUpload={this.beforeUpload}
                                onChange={this.handleCoverChange.bind(this)}
                            >
                                {imageUrl ? <img className={Style.cover} src={imageUrl} alt="" /> : uploadButton}
                            </Upload>
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