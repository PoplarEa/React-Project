import React, { Component } from 'react'
import { Button, Modal, message } from 'antd';
import { Table } from 'antd';
import axios from 'axios';
import { Form, Input } from 'antd';
// const { confirm } = Modal;
class product extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dates: null,
            columns: [
                {
                    title: '商品编号',
                    dataIndex: 'id'
                },
                {
                    title: '商品名称',
                    dataIndex: 'product_name',
                },
                {
                    title: '商品价格',
                    dataIndex: 'product_price',
                },
                {
                    title: '商品数量',
                    dataIndex: 'product_num',
                },
                {
                    title: '操作',
                    render: (record) => (
                        <div>
                            <Button size="small" onClick={() => { this.getIddata(record.id) }}>修改</Button>
                            &nbsp;
                            <Button size="small" type="danger" onClick={() => { this.delproduct(record.id) }}>删除</Button>
                        </div>
                    )
                },
            ],

            data: [],
            page: 1,
            page_size: 2,
            total: 0,
            visible: false,
            editId: ""
        }


    }

    timer = () => {

        setInterval(() => {
            this.setState({
                dates: new Date().toLocaleString()
            })
        }, 1000)
    }

    // 在页面显示出来之后调用接口取数据
    componentDidMount() {
        this.getproduct()
        this.timer()
    }

    componentWillMount() {
        clearInterval(this.timer)
    }

    //渲染数据
    getproduct = (page) => {
        axios.get(`/showproduct?page=${page || this.state.page}&page_size=${this.state.page_size}`).then(res => {
            // console.log(res)
            if (res.data.code === 200) {
                this.setState({
                    data: res.data.data,
                    total: res.data.total
                })
            }
        })
    }
    //分页
    pageChanged = (page) => {
        // console.log(page_size)
        this.setState({
            page
        })
        this.getproduct(page)
    }
    //点击添加商品按钮 显示弹框
    showModal = () => {
        this.setState({
            visible: true
        });
    };

    //表单里的确定按钮
    handleOk = e => {

        this.props.form.validateFields((err, values) => {
            // console.log(values)
            if (!err) {
                // 判断如果editId == "" 就添加商品
                if (this.state.editId === "") {
                    axios.post(`/addproduct`, values).then(res => {
                        // console.log(res)
                        if (res.data.code === "200") {
                            message.success("添加成功");
                            // 清空表单数据
                            this.props.form.resetFields()

                            this.setState({
                                visible: false
                            })
                            this.getproduct();
                        } else {
                            message.error('添加失败')
                        }
                    })
                } else {
                    // 如果不等于空 调用接口回显数据
                    axios.put(`/updateproduct?id=` + this.state.editId, values).then(res => {
                        console.log(res)
                        if (res.data.code === "200") {
                            message.success("更改成功");
                            // 清空表单数据
                            this.props.form.resetFields()

                            this.setState({
                                visible: false
                            })
                            this.getproduct();
                        } else {
                            message.error('更改失败')
                        }
                    })
                }
            }
        });
    };
    //点击取消
    handleCancel = e => {
        // 清空表单
        this.props.form.resetFields()
        this.setState({
            visible: false,
        });
    };
    //删除
    delproduct = (id) => {
        // console.log(this.state.data)
        Modal.confirm({
            title: '删除商品',
            content: '一单删除 不可以恢复',
            onOk: () => {
                //调用接口
                axios.delete(`/delproduct/${id}`).then(res => {
                    //  console.log(res)
                    if (res.data.code === "200") {
                        message.success("删除成功");
                        if (this.state.data.length === 1) {
                            this.setState({
                                page: this.state.page - 1
                            })
                            this.getproduct(this.state.page - 1)
                        } else {
                            this.getproduct()
                        }

                    } else {
                        message.error("删除失败")
                    }
                })
            },
            onCancel() { },
        });
    }
    //根据id回显数据
    getIddata = (id) => {
        // console.log(id)
        axios.get(`/updateproduct/${id}`).then(res => {
            //    console.log(res)
            if (res.data.code === "200") {
                // .setFieldsValue动态改变表单值
                this.props.form.setFieldsValue({
                    product_name: res.data.data[0].product_name,
                    product_price: res.data.data[0].product_price,
                    product_num: res.data.data[0].product_num

                })
                this.setState({
                    visible: true,
                    editId: id,
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {this.state.dates}
                <br />
                <Button type="primary" onClick={this.showModal}>添加商品</Button>
                <br />
                <br />
                <Table
                    rowKey='id'
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    bordered
                    pagination={{
                        onChange: this.pageChanged,
                        total: this.state.total,
                        pageSize: this.state.page_size,
                        current: this.state.page,
                        showTotal: (total, range) => `共有 ${total} 条，当前显示的是第 ${range[0]} 条 ~ ${range[1]} 条`
                    }}
                />
                <Modal
                    title={this.state.editId === "" ? '添加商品' : "修改商品"}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form className="login-form">
                        <Form.Item>
                            {getFieldDecorator('product_name', {
                                rules: [{ required: true, message: '商品名称不能为空' }],
                            })(
                                <Input
                                    placeholder="请输入商品名称"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('product_price', {
                                rules: [
                                    { required: true, message: '商品价格不能为空' },
                                    {
                                        pattern: /^\d+(\.\d{1,2})?$/,
                                        message: '商品价格必须是数字'

                                    }
                                ],
                            })(
                                <Input
                                    placeholder="请输入商品价格"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('product_num', {
                                rules: [
                                    { required: true, message: '商品数量不能为空' },
                                    {
                                        pattern: /^\d+(\.\d{1,2})?$/,
                                        message: '商品数量必须是数字'

                                    }
                                ],
                            })(
                                <Input
                                    placeholder="请输入商品数量"
                                />,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(product)