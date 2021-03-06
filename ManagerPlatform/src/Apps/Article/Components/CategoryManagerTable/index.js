import React, {PureComponent, Fragment} from 'react';
import {Table, Alert, Badge, Divider} from 'antd';
import styles from './index.less';
import EditableCell from '../../../../components/EditableCell';

class CategoryManagerTable extends PureComponent {
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
    onCellChange = (id, field) => {
        const {updateCategory} = this.props;
        return (text, success, fail) => {
            const payload = {};
            payload.id = id;
            payload[field] = text;
            return updateCategory(payload, success, fail);
        }
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
                title: '栏目名',
                dataIndex: 'name',
                width: 150,
                render: (text, record) => (
                    <EditableCell
                        value={text}
                        onChange={this.onCellChange(record.id, 'name')}
                    />
                )
            },
            {
                title: '状态',
                dataIndex: 'del',
                render: (text) => {
                    if (text == 1) {
                        return '删除';
                    } else {
                        return '在线';
                    }
                }
            },
            {
                title: '父栏目id',
                dataIndex: 'parent_id'
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
            },
            {
                title: '操作',
                render: (text, record) => {
                    let changeStatus = '';
                    if (record.del == 0) {
                        changeStatus = <a href="" onClick={(e) => this.handleTableDelete(record.id, 1, e)}>删除</a>
                    } else {
                        changeStatus = <a href="" onClick={(e) => this.handleTableDelete(record.id, 0, e)}>取消删除</a>;
                    }
                    return <Fragment>
                        {changeStatus}
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
                    dataSource={list}
                    columns={columns}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default CategoryManagerTable;
