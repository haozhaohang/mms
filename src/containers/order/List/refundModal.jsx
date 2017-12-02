import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { InputNumber, Modal, Form } from 'antd'
import URI from 'urijs'

import FormItem from 'components/FormItem'

class RefundModal extends PureComponent {
    constructor(props) {
        super(props)
        
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();

        const { value, onOk, form: { validateFields, resetFields } } = this.props;
        
        validateFields((errors, fieldValue) => {
            console.log(errors)
            if (errors) {
                return;
            }
            
            onOk({
                order_id: value.order_id,
                ...fieldValue
            })

            resetFields()
        });
    }

    render() {
        const { visible, value, onCancel, form: { getFieldDecorator } } = this.props

        const refundMoneyFieldDecorator = getFieldDecorator('refund_money', {
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
                        网费
                    </FormItem>
                    <FormItem label="已支付金额">
                        {value.pay_money} 元
                    </FormItem>
                    <FormItem label="退款金额">
                        {
                            refundMoneyFieldDecorator(
                                <InputNumber />
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(RefundModal)
