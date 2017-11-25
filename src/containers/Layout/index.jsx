import React, { PureComponent } from 'react'
import { Layout, Menu, Icon } from 'antd'

import PageRoute from './route';

import './index.css'

const { Header, Sider, Content } = Layout;

const menu = [
    {
        name: '门店管理',
        icon: 'user',
        path: '/merchant-list'
    },
    {
        name: '商品管理',
        icon: 'video-camera',
        path: '/goods-list'
    },
    {
        name: '会员管理',
        icon: 'video-camera',
        path: '/member-list'
    }
]


class BasicLayout extends PureComponent {
    constructor(props) {
        super(props)

        this.handleToggle = this.handleToggle.bind(this)
        this.handleChangeMenu = this.handleChangeMenu.bind(this)

        this.state = {
            collapsed: false
        }
    }

    handleToggle() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    handleChangeMenu({ key }) {
        const { history: { push } } = this.props

        push(menu[key].path)
    }

    render() {
        const { collapsed } = this.state

        return (
            <Layout className="basic-layout">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <div className="logo" />

                    <Menu
                        theme="dark"
                        mode="inline"
                        onClick={this.handleChangeMenu}
                    >
                        {
                            menu.map(({ name, icon, path }, index) => (
                                <Menu.Item
                                    key={index}
                                >
                                    <Icon type={icon} />
                                    <span>{name}</span>
                                </Menu.Item>
                            ))
                        }
                    </Menu>
                </Sider>

                <Layout>
                    <Header className="header">
                        <Icon
                            className="trigger"
                            type='menu-fold'
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.handleToggle}
                        />
                    </Header>
                    <Content className="content">
                        <div><PageRoute/></div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default BasicLayout