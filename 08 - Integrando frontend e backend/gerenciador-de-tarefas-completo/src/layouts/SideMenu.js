import React, { PureComponent, Component } from 'react';

import { Layout, Menu, Icon } from 'antd';
import { Route, Link, withRouter } from 'react-router-dom';

import './SideMenu.css';
const { Sider } = Layout;


const MENU_ITEMS = [
    {
        to: '/',
        text: 'Home',
        icon: 'home'
    }, {
        to: '/tarefas',
        text: 'Tarefas',
        icon: 'file-text'
    }, {
        to: '/sobre',
        text: 'Sobre',
        icon: "info-circle-o",
    }
];

class SideMenu extends Component {

    state = {
        collapsed: false,
    };

    _onCollapse = (collapsed, type) => {
        this.setState({ collapsed });
    }

    render() {
        const { collapsed } = this.state;

        const menuItems = MENU_ITEMS.map(item => (
            <Menu.Item key={item.to} style={{ padding: '0px 0px 0px 0px' }}>
                <Link to={item.to}>
                    <Icon type={item.icon} />
                    <span className="nav-text">
                        {item.text}
                    </span>
                </Link>
            </Menu.Item >
        ));

        return (
            <Sider
                breakpoint="md"
                collapsedWidth="0"
                onCollapse={this._onCollapse}
                collapsed={collapsed}
            >

                <div className="side-menu-logo" >
                    <h1>Logotipo</h1>
                </div>

                <Menu theme="dark" mode="inline"
                    selectedKeys={[this.props.location.pathname]}
                    defaultSelectedKeys={['/']}>
                    {menuItems}
                </Menu>

            </Sider>
        );
    }
}

export default withRouter(SideMenu);