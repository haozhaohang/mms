import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom'
import { Button, Form, Input, InputNumber, notification, Breadcrumb } from 'antd'
import URI from 'urijs'

import FormItem from 'components/FormItem'
import * as actions from 'actions/categoryEdit'
import './index.css'

const { TextArea } = Input;

class CategoryEdit extends PureComponent {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const { id, fetchCategoryInfo } = this.props

        fetchCategoryInfo({ id });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { id, info, form, history, fetchCategoryEdit } = this.props;

        form.validateFields((errors, values) => {
            if (errors) {
                return;
            }

            fetchCategoryEdit({ ...values, id }).then(() => {
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

        const nameFieldDecorator = getFieldDecorator('name', {
            initialValue: info.name,
            rules: [
                { required: true, message: '请输入商品分类名称' }
            ]
        });

        const descFieldDecorator = getFieldDecorator('desc', {
            initialValue: info.desc,
            rules: [
                { required: true, message: '请输入商品分类描述' }
            ]
        });

        const sequenceFieldDecorator = getFieldDecorator('sequence', {
            initialValue: info.sequence,
            rules: [
                { required: true, message: '请输入商品分类顺序' }
            ]
        });

        return (
            <section className="merchant-edit">
                <div className="breadcrumb-content">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/category-list">分类列表</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>分类编辑</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                
                <Form layout="horizontal">

                    <FormItem label="商品分类名称">
                        {
                            nameFieldDecorator(
                                <Input />
                            )
                        }
                    </FormItem>

                    <FormItem label="商品分类描述">
                        {
                            descFieldDecorator(
                                <TextArea rows={4} />
                            )
                        }
                    </FormItem>

                    <FormItem label="商品分类顺序">
                        {
                            sequenceFieldDecorator(
                                <InputNumber />
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

const mapStateToProps = ({ categoryEdit }, { location }) => ({ ...categoryEdit, ...URI.parseQuery(location.search) })

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(CategoryEdit))
