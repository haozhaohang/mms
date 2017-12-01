import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { InputNumber, Modal, Form } from 'antd'
import URI from 'urijs'

import FormItem from 'components/FormItem'

class InventoryModal extends PureComponent {
    constructor(props) {
        super(props)
        
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();

        const { value, onOk, form: { validateFields, resetFields } } = this.props;

        validateFields((errors, fieldValue) => {
            if (errors) {
                return;
            }
            
            onOk({
                id: value.id,
                ...fieldValue
            })

            resetFields()
        });
    }

    render() {
        const { visible, value, onCancel, form: { getFieldDecorator } } = this.props

        const stockNumFieldDecorator = getFieldDecorator('stock_num', {
            initialValue: 0,
            rules: [
                { required: true, message: '请输入' }
            ]
        });


        return (
            <Modal
                title="设置库存"
                visible={visible}
                onOk={this.handleSubmit}
                onCancel={onCancel}
            >
                <Form>
                    <FormItem label="商品名称">
                        {value.name}
                    </FormItem>
                    <FormItem label="当前库存">
                        {value.stock_num}
                    </FormItem>
                    <FormItem label="增加库存">
                        {
                            stockNumFieldDecorator(
                                <InputNumber />
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(InventoryModal)
