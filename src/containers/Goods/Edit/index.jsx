import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom'
import { Button, Form, Input, InputNumber, notification, Upload, Icon, Radio, Breadcrumb, Select } from 'antd'
import URI from 'urijs'

import UploadImage from 'components/UploadImage'
import FormItem from 'components/FormItem'
import * as actions from 'actions/goodsEdit'
import { GOODS_REPERTORY } from 'constants/basic'
import './index.css'

const RadioGroup = Radio.Group
const Option = Select.Option;
const { TextArea } = Input;

class GoodsEdit extends PureComponent {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const { id, fetchGoodsInfo, fetchGoodsCategory } = this.props

        fetchGoodsInfo({ id });

        fetchGoodsCategory()
    }

    handleSubmit(e) {
        e.preventDefault();

        const { info, form, history, fetchGoodsEdit } = this.props;

        form.validateFields((errors, values) => {
            if (errors) {
                return;
            }

            fetchGoodsEdit({ is_limit: 10, ...values }).then(() => {
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
            categoryList,
            form: { getFieldDecorator }
        } = this.props;

        const nameFieldDecorator = getFieldDecorator('name', {
            initialValue: info.name,
            rules: [
                { required: true, message: '请输入' }
            ]
        });

        const categoryIdFieldDecorator = getFieldDecorator('category_id', {
            initialValue: info.category_id,
            rules: [
                { required: true, message: '请输入' }
            ]
        });

        const imageFieldDecorator = getFieldDecorator('image', {
            initialValue: info.image,
            rules: [
                { required: true, message: '请输入' }
            ]
        });

        const unitFieldDecorator = getFieldDecorator('unit', {
            initialValue: info.unit,
            rules: [
                { required: true, message: '请输入' }
            ]
        });

        const priceFieldDecorator = getFieldDecorator('price', {
            initialValue: info.price,
            rules: [
                { required: true, message: '请输入' }
            ]
        });

        const stockNumFieldDecorator = getFieldDecorator('stock_num', {
            initialValue: info.stock_num,
            rules: [
                { required: true, message: '请输入' }
            ]
        });

        const sequenceFieldDecorator = getFieldDecorator('sequence', {
            initialValue: info.sequence,
            rules: [
                { required: true, message: '请输入' }
            ]
        });

        const discountFieldDecorator = getFieldDecorator('discount', {
            initialValue: info.discount,
            rules: [
                { required: true, message: '请输入' }
            ]
        });

        const descFieldDecorator = getFieldDecorator('desc', {
            initialValue: info.desc,
            rules: [
                { required: true, message: '请输入' }
            ]
        });

        const categoryIdOptions = categoryList.map(({ id, name }) => (
            <Option key={id} value={String(id)}>{name}</Option>)
        )

        return (
            <section className="merchant-edit">
                <div className="breadcrumb-content">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/goods-list">商品列表</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>商品编辑</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

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
                                <Select placeholder="请选择">
                                    {categoryIdOptions}
                                </Select>
                            )
                        }
                    </FormItem>

                    <FormItem label="单品图片">
                        {
                            imageFieldDecorator(
                                <UploadImage />
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

const mapStateToProps = ({ goodsEdit }, { location }) => ({ ...goodsEdit, ...URI.parseQuery(location.search) })

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(GoodsEdit))
