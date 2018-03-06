import {PureComponent} from "react";
import {connect} from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {Card, Button, Form, Modal, Input, message, Spin, Select} from 'antd';
import ActivityTable from '../Components/ActivityTable';
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
@connect(state => ({
    Activity: state.Activity
}))
@Form.create()
export default class ActivityManager extends PureComponent {
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

    addActivity(flag) {
        this.props.history.push('/activity/add/');
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
            type: 'Activity/list',
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
                    type: 'Activity/add',
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
            type: 'Activity/updateStatusByIds',
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
            type: 'Activity/update',
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
            type: 'Activity/list',
        });
    };

    render() {
        const {selectedRows} = this.state;
        const {Activity:{loading, data}} = this.props;
        return <PageHeaderLayout>
            <Card>
                <div>
                    <Button icon="plus" type="primary" onClick={() => this.addActivity()}>添加活动</Button>
                </div>
                <ActivityTable
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