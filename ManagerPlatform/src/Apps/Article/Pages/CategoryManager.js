import {PureComponent} from "react";
import {connect} from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {Card, Button, Form, Modal, Input, Cascader, message, Spin} from 'antd';
import CategoryManagerTable from '../Components/CategoryManagerTable';
const FormItem = Form.Item;

@connect(state => ({
    Category: state.Category
}))
@Form.create()
export default class CategoryManager extends PureComponent {
    state = {
        categoryId: 0,
        categoryInvalid: false,
        addInputValue: '',
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

    addCategory(flag) {
        this.setState({
            modalVisible: !!flag,
        });
        const { dispatch } = this.props;
        dispatch({
            type: 'Category/tree',
        });
    };

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;
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
        const { dispatch } = this.props;
        const { formValues } = this.state;
        const query = {
            currentPage: this.state.pagination.currentPage,
            pageSize: this.state.pagination.pageSize,
            ...formValues,
            ...this.state.sorter,
        };
        dispatch({
            type: 'Category/list',
            payload: query,
        });
    };

    onCategoryChange(value, selectedOptions) {
        this.setState({
            categoryId: value[value.length - 1],
            categoryInvalid: false,
        });
    };
    handleAddInput = (e) => {
        this.setState({
            addInputValue: e.target.value,
        });
    };
    handleAdd = () => {
        const {categoryId} = this.state;
        this.props.dispatch({
            type: 'Category/add',
            payload: {
                name: this.state.addInputValue,
                parentId: categoryId
            },
            success: () => {
                message.success('添加成功');
                this.setState({
                    modalVisible: false,
                });
            }
        });
    };
    generateCategoryOptions = (categoryList) => {
        categoryList.forEach(function (item, index) {
            categoryList[index].value = item.id;
            categoryList[index].label = item.name;
            if (item.children) {
                categoryList[index].children = this.generateCategoryOptions(item.children);
            }
        }, this);
        return categoryList;
    };

    handleTableDelete = (id, status) => {
        const { dispatch } = this.props;
        if (status == 1) {
            dispatch({
                type: 'Category/delete',
                payload: {
                    id: id
                },
                success: () => {
                    message.success('删除成功！');
                    this.fetch();
                },
                fail: (msg) => {
                    message.warning(msg);
                }
            });
        } else {
            dispatch({
                type: 'Category/cancelDelete',
                payload: {
                    id: id
                },
                success: () => {
                    message.success('取消删除成功！');
                    this.fetch();
                },
                fail: (msg) => {
                    message.warning(msg);
                }
            });
        }
    };

    updateCategory(payload, success, fail) {
        const { dispatch } = this.props;
        dispatch({
            type: 'Category/update',
            payload: payload,
            success: () => {
                message.success('修改成功！');
                success();
            },
            fail: (msg) => {
                message.warning(msg);
                fail();
            }
        });
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'Category/list',
        });
    };

    render() {
        const {selectedRows, modalVisible, addInputValue} = this.state;
        const {Category:{listLoading, data, tree, treeLoading}} = this.props;
        const options = this.generateCategoryOptions(tree);
        return <PageHeaderLayout>
            <Card>
                <div>
                    <Button icon="plus" type="primary" onClick={() => this.addCategory(true)}>添加栏目</Button>
                </div>
                <CategoryManagerTable
                    selectedRows={selectedRows}
                    loading={listLoading}
                    data={data}
                    onSelectRow={this.handleSelectRows}
                    onChange={this.handleStandardTableChange}
                    onDelete={this.handleTableDelete}
                    updateCategory={this.updateCategory.bind(this)}
                />
            </Card>

            <Modal
                title="添加栏目"
                visible={modalVisible}
                onOk={this.handleAdd}
                onCancel={() => this.handleModalVisible()}
            >
                <Spin spinning={treeLoading}>
                    <Form>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 15}}
                            label="栏目"
                            className={this.state.categoryInvalid ? "has-error" : ""}
                        >
                            <Cascader
                                onChange={this.onCategoryChange.bind(this)}
                                options={options}
                                placeholder="父栏目"
                                showSearch
                                changeOnSelect
                            />
                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 15}}
                            label="栏目名"
                        >
                            <Input placeholder="请输入栏目名" onChange={this.handleAddInput} value={addInputValue}/>
                        </FormItem>
                    </Form>
                </Spin>
            </Modal>
        </PageHeaderLayout>
    }
}