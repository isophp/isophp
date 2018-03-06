import React, {PureComponent, Fragment} from 'react';
import {Table, Divider} from 'antd';
import styles from './index.less';
import {Link} from 'dva/router';

class ManagerTable extends PureComponent {
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
    };
    handleTableDelete = (id, status, e) => {
        e.preventDefault();
        this.props.onDelete(id, status);
    };
    render() {
        const {selectedRowKeys} = this.state;
        const {data: {list, pagination}, loading} = this.props;

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '活动名',
                dataIndex: 'title',
            },
            {
                title: '封面',
                dataIndex: 'cover',
                render: val => (<div><img src={val} className={styles.avatar} /></div>)
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (text) => {
                    if (text == 1) {
                        return '下线';
                    } else {
                        return '在线';
                    }
                }
            },
            {
                title: '排序权重',
                dataIndex: 'sort'
            },
            {
                title: '操作',
                render: (text, record) => {
                    let changeStatus = '';
                    if (record.status == 0) {
                        changeStatus = <a href="" onClick={(e) => this.handleTableDelete(record.id, 1, e)}>下线</a>
                    } else {
                        changeStatus = <a href="" onClick={(e) => this.handleTableDelete(record.id, 0, e)}>取消下线</a>;
                    }
                    return <Fragment>
                        {changeStatus}
                        <Divider type="vertical"/>
                        <Link  to={"/activity/add/" + record.id}>编辑</Link>
                    </Fragment>
                }
            }
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
                <Table
                    loading={loading}
                    rowKey={record => record.id}
                    dataSource={list}
                    columns={columns}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default ManagerTable;
