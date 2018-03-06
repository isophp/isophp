import React, {PureComponent} from 'react';
import moment from 'moment';
import {Table, Alert, Badge, Divider} from 'antd';
import styles from './index.less';

const statusMap = ['default', 'processing', 'success', 'error'];

class UserListTable extends PureComponent {
    state = {
        selectedRowKeys: [],
    };

    componentWillReceiveProps(nextProps) {
        // clean state
        if (nextProps.selectedRows.length === 0) {
            this.setState({
                selectedRowKeys: [],
            });
        }
    }

    handleRowSelectChange = (selectedRowKeys, selectedRows) => {

        if (this.props.onSelectRow) {
            this.props.onSelectRow(selectedRows);
        }

        this.setState({selectedRowKeys});
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.props.onChange(pagination, filters, sorter);
    }

    cleanSelectedKeys = () => {
        this.handleRowSelectChange([], []);
    }

    render() {
        const {selectedRowKeys} = this.state;
        const {data: {list, pagination}, loading} = this.props;

        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
            },
            {
                title: '昵称',
                dataIndex: 'nickname',
            },
            {
                title: '登录类型',
                dataIndex: 'login_type',
            },
            {
                title: '登录标识',
                dataIndex: 'identifier',
            },
            {
                title: '角色',
                dataIndex: 'role_name',
            },
            {
                title: '用户状态',
                dataIndex: 'user_status',
            },
            {
                title: '登录状态',
                dataIndex: 'auth_status',
            },
            {
                title: '头像',
                dataIndex: 'avatar',
                render: val => (<div><img src={val} className={styles.avatar} /></div>)
            },
            {
                title: '操作',
                render: () => (
                    <div>
                        <span>删除</span>
                        <Divider type="vertical"/>
                        <span>编辑</span>
                    </div>
                ),
            },
        ];

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        };

        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
                disabled: record.disabled,
            }),
        };

        return (
            <div className={styles.UserListTable}>
                <div className={styles.tableAlert}>
                    <Alert
                        message={(
                            <div>
                                已选择 <a style={{fontWeight: 600}}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                                <a onClick={this.cleanSelectedKeys} style={{marginLeft: 24}}>清空</a>
                            </div>
                        )}
                        type="info"
                        showIcon
                    />
                </div>
                <Table
                    loading={loading}
                    rowKey={record => record.id}
                    rowSelection={rowSelection}
                    dataSource={list}
                    columns={columns}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default UserListTable;
