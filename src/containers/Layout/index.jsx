import React, { PureComponent } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { connect } from 'react-redux';

import sidebarPaths from 'constants/sidebar';
import PageRoute from './route';
import './index.css'

const SubMenu = Menu.SubMenu;

const { Header, Sider, Content } = Layout;

class BasicLayout extends PureComponent {
    constructor(props) {
        super(props)

        this.handleToggle = this.handleToggle.bind(this)
        this.handleChangeMenu = this.handleChangeMenu.bind(this)
        this.handleQueryMenu = this.handleQueryMenu.bind(this)

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

        push(sidebarPaths[key])
    }

    handleQueryMenu() {
        const { menu, pathname } = this.props
        const openKeys = [];
        const selectedKeys = [];

        menu.forEach(({ id, chidren }) => (
            chidren.forEach(({ id: pathId, path }) => {
                if (pathname === path) {
                    openKeys.push(id);
                    selectedKeys.push(pathId);
                }
            })
        ))

        return { openKeys, selectedKeys }
    }

    render() {
        const { collapsed } = this.state
        const { menu, pathname } = this.props
        const { openKeys, selectedKeys } = this.handleQueryMenu();

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
                        defaultOpenKeys={openKeys}
                        defaultSelectedKeys={selectedKeys}
                        onClick={this.handleChangeMenu}
                    >
                        {
                            menu.map(({ id, name, chidren }) => (
                                <SubMenu
                                    key={id}
                                    title={<span><Icon type="mail" /><span>{name}</span></span>}
                                > 
                                    {
                                        chidren.map(({ id, name, path }) => (
                                            <Menu.Item key={id} path={path}>{name}</Menu.Item>
                                        ))
                                    }
                                </SubMenu>
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

const mapStateToProps = ({ user, menu }, { location: { pathname } }) => ({
    pathname,
    user,
    menu
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
