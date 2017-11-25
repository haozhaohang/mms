import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Button, Form, Input, InputNumber, notification, Upload, Icon, Radio } from 'antd'
import URI from 'urijs'

import FormItem from 'components/FormItem'
import * as actions from 'actions/goodsEdit'
import { GOODS_STATUS } from 'constants/basic'
import './index.css'

const RadioGroup = Radio.Group
const { TextArea } = Input;

class GoodsEdit extends PureComponent {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const { id, fetchGoodsInfo } = this.props

        fetchGoodsInfo({ id });
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
            info = {},
            form: { getFieldDecorator }
        } = this.props;

        const nameFieldDecorator = getFieldDecorator('name', {
            initialValue: info.name,
            rules: [
                { required: true, max: 100, message: '请输入商品名称，不超过 100 个字' }
            ]
        });

        const categoryIdFieldDecorator = getFieldDecorator('category_id', {
            initialValue: info.category_id,
            rules: [
                { required: true, max: 100, message: '请输入商品名称，不超过 100 个字' }
            ]
        });

        const imageFieldDecorator = getFieldDecorator('image', {
            initialValue: info.image,
            rules: [
                { required: true, max: 100, message: '请输入商品名称，不超过 100 个字' }
            ]
        });

        const unitFieldDecorator = getFieldDecorator('unit', {
            initialValue: info.unit,
            rules: [
                { required: true, message: '请输入商品名称' }
            ]
        });

        const priceFieldDecorator = getFieldDecorator('price', {
            initialValue: info.price,
            rules: [
                { required: true, message: '请输入商品名称，不超过 100 个字' }
            ]
        });

        const isLimitFieldDecorator = getFieldDecorator('is_limit', {
            initialValue: info.is_limit,
            rules: [
                { required: true, message: '请输入商品名称，不超过 100 个字' }
            ]
        });

        const stockNumFieldDecorator = getFieldDecorator('stock_num', {
            initialValue: info.stock_num,
            rules: [
                { required: true, message: '请输入商品名称，不超过 100 个字' }
            ]
        });

        const sequenceFieldDecorator = getFieldDecorator('sequence', {
            initialValue: info.sequence,
            rules: [
                { required: true, message: '请输入商品名称，不超过 100 个字' }
            ]
        });

        const discountFieldDecorator = getFieldDecorator('discount', {
            initialValue: info.discount,
            rules: [
                { required: true, message: '请输入商品名称，不超过 100 个字' }
            ]
        });

        const descFieldDecorator = getFieldDecorator('desc', {
            initialValue: info.desc,
            rules: [
                { required: true, message: '请输入商品名称，不超过 100 个字' }
            ]
        });

        const isLimitOptions = Object.entries(GOODS_STATUS).map(([key, value]) => ({ label: value, value: key }))

        return (
            <section className="merchant-edit">
                <Form layout="horizontal">

                    <FormItem label="单品名称">
                        {
                            nameFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem label="单品分类">
                        {
                            categoryIdFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem label="单品图片">
                        {
                            imageFieldDecorator(
                                <Upload
                                    action='//jsonplaceholder.typicode.com/posts/'
                                    listType='picture'
                                >
                                    <Button>
                                        <Icon type="upload" /> upload
                                    </Button>
                                </Upload>
                            )
                        }
                    </FormItem>

                    <FormItem label="商品单位">
                        {
                            unitFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem label="价格">
                        {
                            priceFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem label="是否有库存">
                        {
                            isLimitFieldDecorator(
                                <RadioGroup options={isLimitOptions} />
                            )
                        }
                    </FormItem>

                    <FormItem label="库存数量">
                        {
                            stockNumFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem label="单品顺序">
                        {
                            sequenceFieldDecorator(
                                <InputNumber />
                            )
                        }
                    </FormItem>

                    <FormItem label="单品折扣">
                        {
                            discountFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem label="单品描述">
                        {
                            descFieldDecorator(
                                <TextArea rows={4} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(GoodsEdit))
