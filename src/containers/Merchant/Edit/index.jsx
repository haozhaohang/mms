import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Button, Form, Input, InputNumber, notification } from 'antd'
import URI from 'urijs'

import FormItem from 'components/FormItem'
import * as actions from 'actions/merchantEdit'
import './index.css'

class MerchantEdit extends PureComponent {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const { id, fetchMerchantInfo } = this.props

        fetchMerchantInfo({ id });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { info, form, history, fetchMerchantEdit } = this.props;

        form.validateFields((errors, values) => {
            if (errors) {
                return;
            }

            fetchMerchantEdit(values).then(() => {
                notification.success({
                    message: '提示信息',
                    description: '保存成功',
                });

                history.goBack();
            })
        });
    }

    render() {
        const {
            info,
            form: { getFieldDecorator }
        } = this.props;

        const merchantNameFieldDecorator = getFieldDecorator('merchant_name', {
            initialValue: info.merchant_name,
            rules: [
                { required: true, max: 100, message: '请输入商品名称，不超过 100 个字' }
            ]
        });

        const ownerNameFieldDecorator = getFieldDecorator('owner_name', {
            initialValue: info.owner_name,
            rules: [
                { required: true, max: 100, message: '请输入商品名称，不超过 100 个字' }
            ]
        });

        const ownerTelephoneFieldDecorator = getFieldDecorator('owner_telephone', {
            initialValue: info.owner_telephone,
            rules: [
                { required: true, max: 100, message: '请输入商品名称，不超过 100 个字' }
            ]
        });

        const telFieldDecorator = getFieldDecorator('tel', {
            initialValue: info.tel,
            rules: [
                { required: true, message: '请输入商品名称' }
            ]
        });

        const machinesFieldDecorator = getFieldDecorator('machines', {
            initialValue: info.machines,
            rules: [
                { required: true, message: '请输入商品名称，不超过 100 个字' }
            ]
        });

        const addressFieldDecorator = getFieldDecorator('address', {
            initialValue: info.address,
            rules: [
                { required: true, message: '请输入商品名称，不超过 100 个字' }
            ]
        });

        return (
            <section className="merchant-edit">
                <Form layout="horizontal">

                    <FormItem label="门店名称">
                        {
                            merchantNameFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem label="门店名称2">
                        {
                            ownerNameFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem label="手机号">
                        {
                            ownerTelephoneFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem label="座机号">
                        {
                            telFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem label="机器数量">
                        {
                            machinesFieldDecorator(
                                <InputNumber />
                            )
                        }
                    </FormItem>

                    <FormItem label="门店地址">
                        {
                            addressFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem buttonsContainer>
                        <Button type="primary" data-type="2" onClick={this.handleSubmit} size="default">
                            保存
                        </Button>
                        <Button type="ghost" onClick={this.props.history.goBack}>返回</Button>
                    </FormItem>
                </Form>
            </section>
        )
    }
}

const mapStateToProps = ({ merchantEdit }, { location }) => ({ ...merchantEdit, ...URI.parseQuery(location.search) })

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(MerchantEdit))
