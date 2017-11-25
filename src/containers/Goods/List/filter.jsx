import React, { PureComponent } from 'react';
import { Form, Input, Button, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class Filter extends PureComponent {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const { onSubmit, form } = this.props;

        onSubmit(form.getFieldsValue());
    }

    handleReset() {
        const { onSubmit, form: { resetFields } } = this.props;

        onSubmit({});
        resetFields();
    }

    render() {
        const { cateList, goodsName, categoryId, status, form: { getFieldDecorator } } = this.props;

        return (
            <Form layout="inline" onSubmit={this.handleSubmit} className="search-form">
                <FormItem label="门店名称">
                    {
                        getFieldDecorator('goodsName', { initialValue: goodsName })(
                            <Input
                                placeholder="请输入门店名称"
                            />
                        )
                    }
                </FormItem>
                <div className="filter-btn">
                    <Button type="primary" htmlType="submit">搜索</Button>
                    <Button onClick={this.handleReset}>重置</Button>
                </div>
            </Form>
        );
    }
}

export default Form.create()(Filter);