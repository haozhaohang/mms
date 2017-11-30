import React, { PureComponent } from 'react'
import { Layout, Menu, Icon, Avatar, Dropdown, Tag, message, Spin, Modal, Form, Input } from 'antd'

import FormItem from 'components/FormItem'

import './headerLayout.css'

const SubMenu = Menu.SubMenu
const { Header } = Layout

class HeaderLayout extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }

        this.handleMenuClick = this.handleMenuClick.bind(this)
        this.handleModalChange = this.handleModalChange.bind(this)
    }

    handleMenuClick({ key }) {
        if (key === 'password') {
            this.setState({
                visible: true
            })
            return;
        }

        if (key === 'logout') {
            location.href = '/login.html'
            return;
        }
    }

    handleModalChange(modal, status) {
        this.setState({
            [modal]: status
        })
    }

    render() {
        const { visible } = this.state
        const { collapsed, userName, handleToggle, form: { getFieldDecorator } } = this.props;

        const menuList = (
            <Menu onClick={this.handleMenuClick}>
                {/* <Menu.Item key="center"><Icon type="user" />个人中心</Menu.Item> */}
                <Menu.Item key="password"><Icon type="setting" />修改密码</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
            </Menu>
        );

        return (
            <Header className="header-layout" style={{ width: collapsed ? 'calc(100% - 64px)' : 'calc(100% - 200px)' }}>
                <Icon
                    className="trigger"
                    type='menu-fold'
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={handleToggle}
                />
                <div className="account-containers">
                    {
                        userName ? (
                            <Dropdown
                                className="account-dropdown"
                                overlay={menuList}
                            >
                                <span className="account">
                                    <Avatar
                                        className="avatar"
                                        size="small" 
                                        src="https://gw.alipayobjects.com/zos/rmsportal/UjusLxePxWGkttaqqmUI.png"
                                    />
                                    {userName}
                                </span>
                            </Dropdown>
                        )
                        : <Spin size="small" style={{ marginLeft: 8 }} />
                    }
                </div>
                <Modal title="修改密码"
                    visible={visible}
                    onOk={() => this.handleModalChange('visible', false)}
                    confirmLoading={false}
                    onCancel={() => this.handleModalChange('visible', false)}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem label="当前密码">
                            {
                                getFieldDecorator('当前密码', {
                                    rules: [{ required: true, message: '请输入' }],
                                })(
                                    <Input placeholder="请输入" />
                                )
                            }
                        </FormItem>
                        <FormItem label="新密码">
                            {
                                getFieldDecorator('当前密码', {
                                    rules: [{ required: true, message: '请输入' }],
                                })(
                                    <Input placeholder="请输入" />
                                )
                            }
                        </FormItem>
                        <FormItem label="确认密码">
                            {
                                getFieldDecorator('当前密码', {
                                    rules: [{ required: true, message: '请输入' }],
                                })(
                                    <Input placeholder="请输入" />
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </Header>
        );
    }
}

export default Form.create()(HeaderLayout);
