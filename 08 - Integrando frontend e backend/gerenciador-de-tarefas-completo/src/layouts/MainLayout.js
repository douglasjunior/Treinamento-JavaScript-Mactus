import React, { Component } from 'react';

import { Layout, Menu, Icon } from 'antd';
import { Switch, Route } from 'react-router-dom';

import './MainLayout.css';
import SideMenu from './SideMenu';
import ContentRoutes from './ContentRoutes';
import PrivateRoute from '../components/PrivateRoute';
import LoginPage from '../pages/LoginPage';
import UsuarioPage from '../pages/UsuarioPage';
import { getUsuario } from '../utils/LoginManager';

const { Header, Content } = Layout;

export default class MainLayout extends Component {

    _renderContent = () => {
        return (
            <Layout className="main-layout">
                <SideMenu />
                <Layout>
                    <Header style={{ background: '#fff', paddingLeft: 16, fontSize: 18 }} >
                        <Icon type="user" />
                        <span style={{ marginLeft: 8 }}>
                            {getUsuario().nome}
                        </span>
                    </Header>

                    <ContentRoutes />

                </Layout>
            </Layout>
        )
    }

    render() {
        return (
            <Switch>

                <Route path="/login" component={LoginPage} />

                <Route path="/cadastro" component={UsuarioPage} />

                <PrivateRoute path="/" render={this._renderContent} />

            </Switch>
        );
    }

}