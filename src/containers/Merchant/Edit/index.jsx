import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom'
import { Button, Form, Input, InputNumber, notification, Breadcrumb } from 'antd'
import URI from 'urijs'

import FormItem from 'components/FormItem'
import * as actions from 'actions/merchantEdit'
import { phoneReg } from 'assets/js/util'
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

        const { id, info, form, history, fetchMerchantEdit } = this.props;

        form.validateFields((errors, values) => {
            if (errors) {
                return;
            }

            fetchMerchantEdit({ id, ...values }).then(() => {
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
                { required: true, max: 100, message: '请输入' }
            ]
        });

        const ownerNameFieldDecorator = getFieldDecorator('owner_name', {
            initialValue: info.owner_name,
            rules: [
                { required: true, max: 100, message: '请输入' }
            ]
        });

        const ownerTelephoneFieldDecorator = getFieldDecorator('owner_telephone', {
            initialValue: info.owner_telephone,
            rules: [
                { required: true, max: 100, message: '请输入' },
                { pattern: phoneReg, message: '手机格式错误' }
            ]
        });

        const telFieldDecorator = getFieldDecorator('tel', {
            initialValue: info.tel,
            rules: [
                { required: true, message: '请输入' }
            ]
        });

        const machinesFieldDecorator = getFieldDecorator('machines', {
            initialValue: info.machines,
            rules: [
                { required: true, message: '请输入' }
            ]
        });

        const addressFieldDecorator = getFieldDecorator('address', {
            initialValue: info.address,
            rules: [
                { required: true, message: '请输入' }
            ]
        });

        return (
            <section className="merchant-edit">
                <div className="breadcrumb-content">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/merchant-list">门店列表</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>门店编辑</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Form layout="horizontal">

                    <FormItem label="门店名称">
                        {
                            merchantNameFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem label="管理员名称">
                        {
                            ownerNameFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem label="管理员手机号">
                        {
                            ownerTelephoneFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem label="门店电话">
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
