import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import CadastroPage from '../pages/CadastroPage';

export default class MainLayout extends Component {
    state = {}

    renderContent = () => {
        return (
            <div>
                Olá
            </div>
        )
    }

    render() {
        return (
            <Switch>

                <Route path="/login" component={LoginPage} />
                <Route path="/cadastro" component={CadastroPage} />

                <Route render={this.renderContent} />

            </Switch>
        );
    }

}