import {PureComponent} from "react";
import {connect} from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {Card, Button, Form, Modal, Input, Cascader, message, Spin} from 'antd';
import FriendLinkTable from '../Components/FriendLinkTable';
const FormItem = Form.Item;

@connect(state => ({
    FriendLink: state.FriendLink
}))
@Form.create()
export default class FriendLink extends PureComponent {
    state = {
        modalVisible: false,
        selectedRows: [],
        formValues: {},
        pagination: {
            currentPage: 1,
            pageSize: 10,
        },
        sorter: {}
    };
    handleModalVisible = (flag) => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    addFriendLink(flag) {
        this.setState({
            modalVisible: !!flag,
        });
    };

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const {dispatch} = this.props;
        const {formValues} = this.state;
        const query = {};
        if (sorter.field) {
            query.sorter = {
                field: sorter.field,
                order: sorter.order
            };
        }
        query.pagination = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize
        };
        this.setState(query, this.fetch);
    };

    fetch() {
        const {dispatch} = this.props;
        const {formValues} = this.state;
        const query = {
            currentPage: this.state.pagination.currentPage,
            pageSize: this.state.pagination.pageSize,
            ...formValues,
            ...this.state.sorter,
        };
        dispatch({
            type: 'FriendLink/list',
            payload: query,
        });
    };

    handleAdd = () => {
        const {dispatch} = this.props;
        const fetch = this.fetch.bind(this);
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                this.props.dispatch({
                    type: 'FriendLink/add',
                    payload: values,
                    success: () => {
                        message.success('添加成功');
                        this.setState({
                            modalVisible: false,
                        });
                        fetch();
                    }
                });            }
        });
    };

    updateStatusByIds = (ids, status) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'FriendLink/updateStatusByIds',
            payload: {
                ids: ids,
                status: status
            },
            success: () => {
                this.fetch();
            }
        });
    };

    updateInfo(payload, success, fail) {
        const {dispatch} = this.props;
        dispatch({
            type: 'FriendLink/update',
            payload: payload,
            success: () => {
                success();
            },
            fail: () => {
                fail();
            }
        });
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'FriendLink/list',
        });
    };

    render() {
        const {selectedRows, modalVisible, name, url, sort} = this.state;
        const {FriendLink:{loading, data}} = this.props;
        const {getFieldDecorator} = this.props.form;
        return <PageHeaderLayout>
            <Card>
                <div>
                    <Button icon="plus" type="primary" onClick={() => this.addFriendLink(true)}>添加友情链接</Button>
                </div>
                <FriendLinkTable
                    selectedRows={selectedRows}
                    loading={loading}
                    data={data}
                    onSelectRow={this.handleSelectRows}
                    onChange={this.handleStandardTableChange}
                    onDelete={this.updateStatusByIds}
                    updateInfo={this.updateInfo.bind(this)}
                />
            </Card>

            <Modal
                title="添加友情链接"
                visible={modalVisible}
                onOk={this.handleAdd}
                onCancel={() => this.handleModalVisible()}
            >
                <Form>
                    <FormItem
                        labelCol={{span: 4}}
                        wrapperCol={{span: 15}}
                        label="链接名"
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                {required: true, message: '请输入链接名'},
                                {type: 'string'},
                                {max: 15}
                            ],
                        })(
                            <Input placeholder="请输入链接名"/>
                        )}
                    </FormItem>
                </Form>
                <Form>
                    <FormItem
                        labelCol={{span: 4}}
                        wrapperCol={{span: 15}}
                        label="url"
                    >
                        {getFieldDecorator('url', {
                            rules: [
                                {required: true, message: '请输入链接地址'},
                                {type: 'url', message: '请输入正确链接地址'}
                            ],
                        })(
                            <Input placeholder="请输入链接名"/>
                        )}
                    </FormItem>
                </Form>
                <Form>
                    <FormItem
                        labelCol={{span: 4}}
                        wrapperCol={{span: 15}}
                        label="排序权重"
                    >
                        {getFieldDecorator('sort', {
                            rules: [
                                {required: true, message: '请输入整数权重'},
                                {type: 'number', message: '请输入整数权重'}
                            ],
                            initialValue: 0
                        })(
                            <Input placeholder="请输入链接名"/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </PageHeaderLayout>
    }
}