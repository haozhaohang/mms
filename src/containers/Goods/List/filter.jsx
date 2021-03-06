import React, { PureComponent } from 'react';
import { Form, Input, InputNumber, DatePicker, Button, Select, Row, Col, Icon } from 'antd';
import moment from 'moment'

import { GOODS_STATUS } from 'constants/basic'

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class Filter extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            expandForm: false
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleFormReset = this.handleFormReset.bind(this);

        this.toggleForm = this.toggleForm.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderSimpleForm = this.renderSimpleForm.bind(this)
        this.renderAdvancedForm = this.renderAdvancedForm.bind(this)
    }
    handleSearch(e) {
        e.preventDefault();

        const { onSearch, form: { validateFields } } = this.props;

        validateFields((err, fieldsValue) => {
            if (err) return;
            onSearch(fieldsValue)
        });
    }

    handleFormReset() {
        const { onSearch, form: { resetFields } } = this.props;

        onSearch({});
        resetFields();
    }

    toggleForm() {
        this.setState({
            expandForm: !this.state.expandForm
        });
    }

    renderForm() {
        return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }

    renderSimpleForm() {
        const { name, status, form: { getFieldDecorator } } = this.props

        const statusOptions = Object.entries(GOODS_STATUS).map(([ value, label ]) => (
            <Option key={value} value={String(value)}>{label}</Option>)
        )

        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="单品名称">
                            {getFieldDecorator('name', { initialValue: name })(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="单品状态">
                            {getFieldDecorator('status', { initialValue: status })(
                                <Select placeholder="请选择">
                                    <Option value="">全部</Option>
                                    {statusOptions}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <span>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                            {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                                展开 <Icon type="down" />
                            </a> */}
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    renderAdvancedForm() {
        const { name, status, start_time, end_time, form: { getFieldDecorator } } = this.props

        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="单品名称">
                            {
                                getFieldDecorator('name', { initialValue: name })(
                                    <Input placeholder="请输入" />
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="单品状态">
                            {
                                getFieldDecorator('status', { initialValue: status })(
                                    <Select placeholder="请选择">
                                        <Option value="0">全部</Option>
                                        <Option value="10">已上线</Option>
                                        <Option value="15">已下线</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="支付时间">
                            {
                                getFieldDecorator(
                                    'pay_time',
                                    { initialValue: [ start_time && moment.unix(start_time), end_time && moment.unix(end_time) ] }
                                )(
                                    <RangePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )
                            }
                        </FormItem>
                    </Col>
                </Row>
                <div style={{ overflow: 'hidden' }}>
                    <span style={{ float: 'right', marginBottom: 24 }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                        {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            收起 <Icon type="up" />
                        </a> */}
                    </span>
                </div>
            </Form>
        );
    }
    
    render() {
        return (this.renderSimpleForm());
    }
}

export default Form.create()(Filter);
