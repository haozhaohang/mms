import React, { PureComponent } from 'react'
import { Layout, Menu, Icon, Avatar, Dropdown, Tag, message, Spin } from 'antd'
import { connect } from 'react-redux';

import sidebarPaths from 'constants/sidebar';
import HeaderLayout from './headerLayout'
import PageRoute from './route';
import LogoImg from 'assets/img/logo.png'
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

        push(sidebarPaths[key].path)
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
        const { user, menu, pathname } = this.props
        const { openKeys, selectedKeys } = this.handleQueryMenu();
        const { user_name } = user;

        const menuList = (
            <Menu selectedKeys={[]} onClick={this.onMenuClick}>
                <Menu.Item><Icon type="user" />个人中心</Menu.Item>
                <Menu.Item><Icon type="setting" />设置</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
            </Menu>
        );

        return (
            <Layout className="basic-layout">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <div className="logo">
                        <img width="26" alt="logo" src={LogoImg} />
                        {
                            !collapsed && (
                                <p>商户中心</p>
                            )
                        }
                    </div>
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
                                    title={<span><Icon type={sidebarPaths[id]} /><span>{name}</span></span>}
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
                    <HeaderLayout
                        collapsed={collapsed}
                        userName={user_name}
                        handleToggle={this.handleToggle}
                    />
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
