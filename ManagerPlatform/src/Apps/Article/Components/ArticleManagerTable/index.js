import React, {PureComponent, Fragment} from 'react';
import {Table, Alert, Badge, Divider} from 'antd';
import {Link} from 'dva/router';
import styles from './index.less';

class ArticleManagerTable extends PureComponent {
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
    handleTableDelete = (e) => {
        e.preventDefault();
        this.props.onDelete(e.target.dataset.id);
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
                title: '标题',
                dataIndex: 'title',
            },
            {
                title: '栏目',
                dataIndex: 'category_id'
            },
            {
                title: '作者',
                dataIndex: 'author',
            }, {
                title: '评论数',
                dataIndex: 'comments_num',
            },
            {
                title: '点击数',
                dataIndex: 'hits_num'
            },
            {
                title: '置顶',
                dataIndex: 'ontop'
            },
            {
                title: '状态',
                dataIndex: 'status',
            },
            {
                title: '创建时间',
                dataIndex: 'created_at'
            },
            {
                title: '操作',
                render: (text, record) => {
                    let operate = '';
                    if (record.status == 3) {
                        operate = <a href="" data-id={record.id} onClick={(e) => this.props.onDelete(record.id, 2, e)}>发布</a>;
                    } else {
                        operate = <a href="" data-id={record.id} onClick={(e) => this.props.onDelete(record.id, 3, e)}>下架</a>;
                    }
                    return <Fragment>
                        {operate}
                        <Divider type="vertical"/>
                        <Link  to={"/article/add/" + record.id}>编辑</Link>
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

export default ArticleManagerTable;
