import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Button, Form, Input } from 'antd'

import FormItem from 'components/FormItem'
import * as actions from 'actions/merchantEdit'
import './index.css'

class MerchantEdit extends PureComponent {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const { fetchMerchantInfo } = this.props

        fetchMerchantInfo();
    }

    handleSubmit(e) {
        e.preventDefault();

        const { info, form, fetchMerchantEdit } = this.props;

        form.validateFields((errors, values) => {
            if (errors) {
                return;
            }

            fetchMerchantEdit(values)
        });
    }

    render() {
        const {
            form: { getFieldDecorator }
        } = this.props;

        const merchantNameFieldDecorator = getFieldDecorator('name', {
            initialValue: '',
            rules: [
                { required: true, max: 100, message: '请输入商品名称，不超过 100 个字' }
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

const mapStateToProps = ({ home }, { location }) => ({ ...home })

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(MerchantEdit))
