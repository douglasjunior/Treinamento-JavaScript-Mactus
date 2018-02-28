import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { Layout } from 'antd';

// import HomePage from '../pages/HomePage';
// import TarefasPage from '../pages/TarefasPage';
// import SobrePage from '../pages/SobrePage';

const { Content } = Layout;

export default class ContentRoutes extends Component {

    state = {}

    render() {
        return (
            <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

                    {/* <Route path="/" exact component={HomePage} />

                    <Route path="/tarefas" component={TarefasPage} />

                    <Route path="/sobre" component={SobrePage} /> */}

                </div>
            </Content>
        );
    }
}