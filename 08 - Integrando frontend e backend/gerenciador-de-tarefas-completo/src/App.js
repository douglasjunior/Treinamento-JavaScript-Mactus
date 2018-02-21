import React, { Component } from 'react';
import './App.css';

import { LocaleProvider } from 'antd';
import ptBR from 'antd/lib/locale-provider/pt_BR'

import MainLayout from './layouts/MainLayout';

class App extends Component {

    render() {
        return (
            <LocaleProvider locale={ptBR}>
                <MainLayout />
            </LocaleProvider>
        )
    }
}

export default App;
