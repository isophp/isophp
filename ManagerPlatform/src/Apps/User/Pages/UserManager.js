import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
    Spin,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    Modal,
    message
} from 'antd';
import UserListTable from '../Components/UserListTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from './UserManager.less';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
    User: state.User,
    Role: state.Role
}))
@Form.create()
export default class TableList extends PureComponent {
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

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'User/list',
        });
    }

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
            type: 'User/list',
            payload: query,
        });
    };

    handleMenuClick = (e) => {
        const {dispatch} = this.props;
        const {selectedRows} = this.state;

        if (!selectedRows) return;

        switch (e.key) {
            case 'remove':
                dispatch({
                    type: 'User/remove',
                    payload: {
                        no: selectedRows.map(row => row.no).join(','),
                    },
                    callback: () => {
                        this.setState({
                            selectedRows: [],
                        });
                    },
                });
                break;
            default:
                break;
        }
    }

    handleSelectRows = (rows) => {
        this.setState({
            selectedRows: rows,
        });
    };
    handleModalVisible = (flag) => {
        const {dispatch} = this.props;
        this.setState({
            modalVisible: !!flag,
        });
        if (flag) {
            dispatch({
                type: 'Role/list'
            });
        }
    };
    handleAdd = () => {

        const {dispatch} = this.props;
        const fetch = this.fetch.bind(this);
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                if (values.password1 != values.password2) {
                    message.error('两次密码不一致！');
                    return;
                }
                dispatch({
                    type: 'User/add',
                    payload: {
                        username: values.username,
                        nickname: values.nickname,
                        roleId: values.roleId,
                        credential: values.password1
                    },
                    success: () => {
                        message.success('添加成功');
                        this.setState({
                            modalVisible: false,
                        });
                        fetch();
                    }
                });
            }
        });
    };

    render() {
        const {
            User: {loading: userLoading, data},
            Role: {loading: roleLoading, list: roleList}
        } = this.props;
        const {selectedRows, modalVisible, addInputValue} = this.state;
        const {getFieldDecorator} = this.props.form;

        const roleOptions = [];
        roleList.forEach(function (item) {
            roleOptions.push(<Option value={item.id} key={item.id}>{item.name}</Option>);
        });

        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
                <Menu.Item key="remove">删除</Menu.Item>
                <Menu.Item key="approval">批量审批</Menu.Item>
            </Menu>
        );

        return (
            <PageHeaderLayout title="查询表格">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>新建</Button>
                            {
                                selectedRows.length > 0 && (
                                    <span>
                    <Button>批量操作</Button>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down"/>
                      </Button>
                    </Dropdown>
                  </span>
                                )
                            }
                        </div>
                        <UserListTable
                            selectedRows={selectedRows}
                            loading={userLoading}
                            data={data}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
                <Modal
                    title="添加用户"
                    visible={modalVisible}
                    onOk={this.handleAdd}
                    onCancel={() => this.handleModalVisible()}
                >
                    <Spin spinning={roleLoading}>
                        <Form>
                            <FormItem
                                labelCol={{span: 4}}
                                wrapperCol={{span: 15}}
                                label="用户名"
                            >
                                {getFieldDecorator('username', {
                                    rules: [
                                        {required: true, message: '请输入5-20位字母数字组成的用户名'},
                                        {pattern: /^[\w]{5,20}$/, message: '请输入5-20位字母数字组成的用户名'}
                                    ],
                                })(
                                    <Input placeholder="5-20位字母数字下划线组成的用户名"/>
                                )}
                            </FormItem>

                            <FormItem
                                labelCol={{span: 4}}
                                wrapperCol={{span: 15}}
                                label="nickname"
                            >
                                {getFieldDecorator('nickname', {
                                    rules: [
                                        {required: true, message: '请输入昵称'},
                                        {pattern: /^[\u4e00-\u9fa5\w]{2,10}$/, message: '请输入2-10位昵称'},
                                    ],
                                })(
                                    <Input placeholder="请输入昵称"/>
                                )}
                            </FormItem>

                            <FormItem
                                labelCol={{span: 4}}
                                wrapperCol={{span: 15}}
                                label="角色"
                            >
                                {getFieldDecorator('roleId', {
                                    rules: [
                                        {required: true, message: '请选择角色'},
                                        {pattern: /^[\d]{1,5}$/}
                                    ],
                                })(
                                    <Select style={{width: 120}}>
                                        {roleOptions}
                                    </Select>
                                )}
                            </FormItem>

                            <FormItem
                                labelCol={{span: 4}}
                                wrapperCol={{span: 15}}
                                label="登录密码"
                            >
                                {getFieldDecorator('password1', {
                                    rules: [
                                        {required: true, message: '请输入登录密码'},
                                        {
                                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
                                            message: '8-20位并包含大小字母数字'
                                        }
                                    ],
                                })(
                                    <Input placeholder="请输入密码" type="password"/>
                                )}
                            </FormItem>

                            <FormItem
                                labelCol={{span: 4}}
                                wrapperCol={{span: 15}}
                                label="登录密码"
                            >
                                {getFieldDecorator('password2', {
                                    rules: [
                                        {required: true, message: '请再次输入登录密码'},
                                        {
                                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
                                            message: '8-20位并包含大小字母数字'
                                        }
                                    ],
                                })(
                                    <Input placeholder="请再次输入密码" type="password"/>
                                )}
                            </FormItem>
                        </Form>
                    </Spin>
                </Modal>
            </PageHeaderLayout>
        );
    }
}
