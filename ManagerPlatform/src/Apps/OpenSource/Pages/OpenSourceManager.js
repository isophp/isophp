import {PureComponent} from "react";
import {connect} from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {Card, Button, Form, Modal, Input, message, Spin, Select} from 'antd';
import OpenSourceTable from '../Components/OpenSourceTable';
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
@connect(state => ({
    OpenSource: state.OpenSource
}))
@Form.create()
export default class OpenSourceManager extends PureComponent {
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

    addOpenSource(flag) {
        this.props.history.push('/openSource/add/');
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
            type: 'OpenSource/list',
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
                    type: 'OpenSource/add',
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
            type: 'OpenSource/updateStatusByIds',
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
            type: 'OpenSource/update',
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
            type: 'OpenSource/list',
        });
    };

    render() {
        const {selectedRows} = this.state;
        const {OpenSource:{loading, data}} = this.props;
        return <PageHeaderLayout>
            <Card>
                <div>
                    <Button icon="plus" type="primary" onClick={() => this.addOpenSource()}>添加开源项目</Button>
                </div>
                <OpenSourceTable
                    selectedRows={selectedRows}
                    loading={loading}
                    data={data}
                    onSelectRow={this.handleSelectRows}
                    onChange={this.handleStandardTableChange}
                    onDelete={this.updateStatusByIds}
                    updateInfo={this.updateInfo.bind(this)}
                />
            </Card>
        </PageHeaderLayout>
    }
}